import { TextCursor, TextLine } from './run';

export class Paragraph {
  context: CanvasRenderingContext2D;
  drawingSurface: ImageData;
  left: number;
  top: number;
  activeLine?: TextLine;
  lines: TextLine[] = [];
  cursor: TextCursor;
  blinkInterval?: number;

  constructor(
    context: CanvasRenderingContext2D,
    left: number,
    top: number,
    imageData: ImageData,
    cursor: TextCursor
  ) {
    this.context = context;
    this.drawingSurface = imageData;
    this.left = left;
    this.top = top;
    this.lines = [];
    this.cursor = cursor;
  }

  isPointInside(loc: {x: number, y: number}) {
    const { context } = this;
    context.beginPath();
    context.rect(this.left, this.top, this.getWidth(), this.getHeight());
    return context.isPointInPath(loc.x, loc.y);
  }

  getHeight() {
    let h = 0;
    this.lines.forEach(line => {
      h += line.getHeight()
    })
    return h;
  }

  getWidth() {
    let w = 0
    let widest = 0;
    this.lines.forEach(line => {
      w = line.getWidth();
      widest = Math.max(w, widest);
    });
    return widest;
  }

  draw() {
    this.lines.forEach(line => {
      line.draw()
    })
  }

  erase(imageData: ImageData) {
    this.context.putImageData(imageData, 0, 0);
  }

  addLine(line: TextLine) {
    this.lines.push(line);
    this.activeLine = line;
    this.moveCursor(line.left, line.bottom);
  }

  insert(text: string) {
    this.erase(this.drawingSurface);
    if (this.activeLine) {
      this.activeLine.insert(text);
      let t = this.activeLine.text.substring(0, this.activeLine.caret)
      let w = Math.floor(this.context.measureText(t).width);
      this.moveCursor(this.activeLine.left + w, this.activeLine.bottom);
      this.draw();
    }
  }

  blinkCursor(x: number, y: number) {
    let BLINK_OUT = 200
    let BLINK_INTERVAL = 900
    const { cursor } = this;

    this.blinkInterval = setInterval(() => {
      cursor.erase(this.drawingSurface);
      setTimeout(() => {
        cursor.draw(cursor.left, cursor.top + cursor.getHeight())
      }, BLINK_OUT)
    }, BLINK_INTERVAL);
  }

  moveCursorCloseTo(x: number, y: number) {
    let line = this.getLine(y);
    if (line) {
      let column = this.getColumn(line, x);
      if (column) {
        line.caret = column;
        this.activeLine = line;
        this.moveCursor(line.getCaretX(), line.bottom);
      }
    }
  }

  moveCursor(x: number, y: number) {
    const { cursor } = this;
    cursor.erase(this.drawingSurface)
    cursor.draw(x, y);

    if (!this.blinkInterval) {
      this.blinkCursor(x, y);
    }
  }

  moveLinesDown(start: number) {
   for (let i = start; i < this.lines.length; i++)  {
     let line = this.lines[i];
     line.bottom += line.getHeight();
   }
  }

  newLine() {
    if (!this.activeLine) {
      return
    }
    let textBeforeCursor = this.activeLine.text.substring(0, this.activeLine.caret);
    let textAfterCursor = this.activeLine.text.substring(this.activeLine.caret);
    let height = Math.floor(this.context.measureText('W').width * (1 + 1/6))
    let bottom = this.activeLine.bottom + height;
    let activeIndex;
    let line;
    this.erase(this.drawingSurface);
    this.activeLine.text = textBeforeCursor;
    line = new TextLine(this.context, this.activeLine.left, bottom);
    line.insert(textAfterCursor);
    activeIndex = this.lines.indexOf(this.activeLine);
    this.lines.splice(activeIndex + 1, 0, line);
    this.activeLine = line;
    this.activeLine.caret = 0;
    activeIndex++;
    // for (let i = activeIndex + 1; i < this.lines.length; i++) {
    //   line = this.lines[i];
    //   line.bottom += height;
    // }
    this.moveLinesDown(activeIndex + 1);
    this.draw();
    this.cursor.draw(this.activeLine.left, this.activeLine.bottom);
  }

  getLine(y: number) {
    let line;
    for (let i = 0; i < this.lines.length; i++) {
      line = this.lines[i];
      if (y > line.bottom - line.getHeight() && y < line.bottom) {
        return line;
      }
    }
  }

  getColumn(line: TextLine, x: number) {
    let found = false;
    let before;
    let after;
    let closest;
    let tmpLine;
    let column;

    tmpLine = new TextLine(this.context, line.left, line.bottom);
    tmpLine.insert(line.text);

    while(!found && tmpLine.text.length > 0) {
      before = tmpLine.left + tmpLine.getWidth();
      tmpLine.removeCharacterBeforeCaret();
      after = tmpLine.left + tmpLine.getWidth();
      if (after < x) {
        closest = x - after < before - x ? after : before;
        column = closest === before ? tmpLine.text.length + 1 : tmpLine.text.length;
        found = true;
        return column;
      }
    }
  }

  activeLineIsOutOfText() {
    const { activeLine } = this;
    return activeLine && activeLine.text.length === 0;
  }

  activeLineIsTopLine() {
    return this.lines[0] === this.activeLine;
  }

  moveUpOneLine() {
    let lastActiveText 
    let line
    let before
    let after
    if (!this.activeLine) {
      return;
    }
    let lastActiveLine = this.activeLine;
    lastActiveText = '' + lastActiveLine.text;
    let activeIndex = this.lines.indexOf(this.activeLine);
    this.activeLine = this.lines[activeIndex - 1];
    this.activeLine.caret = this.activeLine.text.length;
    this.lines.splice(activeIndex, 1);
    this.moveCursor(this.activeLine.left + this.activeLine.getWidth(), this.activeLine.bottom);
    this.activeLine.text += lastActiveText;
    for (let i = activeIndex; i < this.lines.length; i++) {
      line = this.lines[i];
      line.bottom -= line.getHeight();
    }
  }

  backspace() {
    let lastActiveLine;
    let activeIndex;
    let t;
    let w;
    this.context.save();
    if (this.activeLine && this.activeLine.caret === 0) {
      if (!this.activeLineIsOutOfText()) {
        this.erase(this.drawingSurface);
        this.moveUpOneLine();
        this.draw();
      }
    } else if (this.activeLine) {
      this.erase(this.drawingSurface);
      this.activeLine.removeCharacterBeforeCaret();
      t = this.activeLine.text.slice(0, this.activeLine.caret);
      w = Math.floor(this.context.measureText(t).width);
      this.moveCursor(this.activeLine.left + w, this.activeLine.bottom);
      this.draw();
    }
    this.context.restore();
  }
}
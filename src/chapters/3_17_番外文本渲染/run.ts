function $<T>(selector: string) {
  return document.querySelector(selector) as unknown as T;
}
function $$<T extends Element>(selector: string) {
  return document.querySelectorAll(selector) as NodeListOf<T>;
}
export function run() {
  var canvas = document.getElementById('canvas') as HTMLCanvasElement
  var context = canvas.getContext('2d')!
  // console.log('hello world')
  const w = context.measureText('123').width
  renderHighDPI(canvas, context);
  renderGrid(context);
  renderText(context);
  renderText2(context);
}

function renderGrid(context: CanvasRenderingContext2D) {
  // 画横线
  const step =  10;
  let xIndex = 9.5;
  let yIndex = 9.5;
  const height = 600.5;
  const width = 1000.5;
  context.lineWidth = 1;
  context.strokeStyle = '#ccc';
  for (; xIndex < width; xIndex += step) {
    context.beginPath();
    context.moveTo(xIndex, 0);
    context.lineTo(xIndex, height);
    if ((xIndex -  0.5 + 1) % 100 === 0) {
      context.strokeStyle = 'rgba(255,0,0,0.5)';
    } else {
      context.strokeStyle = '#ccc';
    }
    context.stroke();
  }
  for (; yIndex < height; yIndex += step) {
    context.beginPath();
    context.moveTo(0, yIndex);
    context.lineTo(width, yIndex);
    if ((yIndex -  0.5 + 1) % 100 === 0) {
      context.strokeStyle = 'rgba(255,0,0,0.5)';
    } else {
      context.strokeStyle = '#ccc';
    }
    context.stroke();
  }
}

function renderText(context: CanvasRenderingContext2D) {
  // const text = 'google darling';
  const text = 'XHello world';
  context.font = '16px palatino';
  context.textAlign = 'start';
  context.textBaseline = 'alphabetic';
  context.fillText(text, 100, 100);
  const m = context.measureText(text);
  console.info('m', m);
}


function renderHighDPI(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
  const devicePixelRatio = window.devicePixelRatio;
  if (devicePixelRatio > 1) {
    const originHeight = canvas.height;
    const originWidth = canvas.width;
    canvas.width = originWidth * devicePixelRatio;
    canvas.height = originHeight * devicePixelRatio;
    canvas.style.cssText = `height:${originHeight}px;width:${originWidth}px`;
    context.scale(devicePixelRatio, devicePixelRatio);
  }
}

function renderText2(context: CanvasRenderingContext2D) {
  const textBlock = new TextBlock();
  textBlock.formText('darling 你还欠我一个拥抱，眼泪不断往下掉，this is my love story');
  console.info(textBlock);
}

class TextBlock {
  style: Style = new Style();
  sizeChangeHandler: Array<(newHeight: number, oldHeigh: number) => void> = [];
  content: Text[] = [   ];
  lines: Text[] = [];
  height: number = 0;
  onSizeChange = (fn: (newHeight: number, oldHeigh: number) => void) => {
    this.sizeChangeHandler.push(fn);
  }
  render(context: CanvasRenderingContext2D) {
    // 
  }

  fromObject(data: {}) {

  }

  layout(position: {
    x: number; y: number; maxWidth: number;
  }) {

  }

  formText(data: string) {
    const texts = data.split(/[ ,，。.;；]/);
    let textIndex = 0;
    texts.forEach((text, tIndex) => {
      textIndex += text.length + 1;
      const lastCharacter = data[textIndex - 1] ? data[textIndex - 1] : '';
      /* 如果 text 不是纯英文或者数字，则需要拆成 text，这样换行的时候，他们不作为整体换行 */
      if (!/^[a-zA-Z0-9]+$/g.test(text)) {
        /* 如果是符号后面跟着英文，则需要拆分 */
        text.split('').forEach((sText) => {
          const sTextInstance = new Text();
          sTextInstance.text = sText;
          const charInstance = new Character(sText);
          sTextInstance.content.push(charInstance);
          this.content.push(sTextInstance);
        })
        if (lastCharacter) {
          const sTextInstance = new Text();
          sTextInstance.text = lastCharacter;
          const charInstance = new Character(lastCharacter);
          sTextInstance.content.push(charInstance);
          this.content.push(sTextInstance);
        }
      } else {
        const textInstance = new Text();
        textInstance.text = text + lastCharacter;
        text.split('').forEach((character) => {
          const charInstance = new Character(character);
          textInstance.content.push(charInstance);
        })
        if (lastCharacter) {
          const charInstance = new Character(lastCharacter);
          textInstance.content.push(charInstance);
        }
        this.content.push(textInstance);
      }
    })
    // if (this.content[this.content.length - 1].last.content === ' ') {
    //   this.content[this.content.length - 1].content.pop();
    //   this.content[this.content.length - 1].text = this.content[this.content.length - 1].text.trim();
    // }
  }
}

class Text {
  index: number = 0;
  text: string = '';
  content: Character[] = [];
  style: Style = new Style();
  get width () {
    return this.content.reduce((p, n) => p += n.width, 0)
  }
  get height() {
    if (this.content.length > 0) {
      return this.content[0].height;
    }
    return 0;
  }
  
  get last() {
    return this.content[this.content.length - 1];
  }

  render() {

  }
}

class Character {
  index: number = 0;
  height: number = 0;
  width: number = 0;
  content: string;
  style: Style = new Style();
  position: {
    x: number;
    y: number;
  } = {
    x: 0, y: 0,
  }
  constructor(content: string) {
    this.content = content;
  }

  layout() {
    // 
  }

  get isBreak () {
    return this.content === '\n';
  }

  get isBlank() {
    return this.content === ' ';
  }
  
  render(context: CanvasRenderingContext2D) {
    if (this.isBreak) {
      return;
    } else {
      context.fillText(this.content, this.position.x, this.position.y);
    }
  }
}

class Style {
  layout: {
    fontSize: number;
    lineHeight: number;
  } = {
    fontSize: 16,
    lineHeight: 1.5
  }
  paint: {
    color: string;
    bgColor: string;
  } = {
    color: '#000',
    bgColor: '#fff'
  }

  needReflow(fontSize: number, lineHeight: number) {
    return this.layout.fontSize !== fontSize || this.layout.lineHeight !== lineHeight;
  }

  needRepaint(color: string, bgColor: string) {
    return this.paint.bgColor !== bgColor || this.paint.color !== color;
  }
}
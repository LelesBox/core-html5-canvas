import { text } from "./text";

function $<T>(selector: string) {
  return (document.querySelector(selector) as unknown) as T;
}
function $$<T extends Element>(selector: string) {
  return document.querySelectorAll(selector) as NodeListOf<T>;
}
export function run() {
  var canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const tongZhou = new TZ(canvas);
  tongZhou.renderGrid();
  tongZhou.renderText();
  (window as any).tz = tongZhou;
  // var context = canvas.getContext("2d")!;
  // console.log('hello world')
  // const w = context.measureText("123").width;
  // renderHighDPI(canvas, context);
  // renderGrid(context);
  // renderText(context);
  // renderText2(context);
}

function renderGrid(context: CanvasRenderingContext2D) {
  // 画横线
  const step = 10;
  let xIndex = 9.5;
  let yIndex = 9.5;
  const height = 800.5;
  const width = 1000.5;
  context.lineWidth = 1;
  context.strokeStyle = "#ccc";
  for (; xIndex < width; xIndex += step) {
    context.beginPath();
    context.moveTo(xIndex, 0);
    context.lineTo(xIndex, height);
    if ((xIndex - 0.5 + 1) % 100 === 0) {
      context.strokeStyle = "rgba(255,0,0,0.5)";
    } else {
      context.strokeStyle = "#ccc";
    }
    context.stroke();
  }
  for (; yIndex < height; yIndex += step) {
    context.beginPath();
    context.moveTo(0, yIndex);
    context.lineTo(width, yIndex);
    if ((yIndex - 0.5 + 1) % 100 === 0) {
      context.strokeStyle = "rgba(255,0,0,0.5)";
    } else {
      context.strokeStyle = "#ccc";
    }
    context.stroke();
  }
}

function renderText(context: CanvasRenderingContext2D) {
  // const text = 'google darling';
  const text = "XHello world";
  context.font = "16px palatino";
  context.textAlign = "start";
  context.textBaseline = "alphabetic";
  context.fillText(text, 100, 100);
  const m = context.measureText(text);
  console.info("m", m);
}

function renderHighDPI(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
) {
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
  textBlock.ratio = window.devicePixelRatio;
  (window as any).move = (y: number) => textBlock.move(context, y);
  // textBlock.formText(
  //   `darling 你还欠我一个拥抱，眼泪不断往下掉，this is my love story，让我孤独的时候赶走烦恼。我国与中东地区首例大熊猫保护研究合作之旅正式启动】18日，大熊猫“四海”“京京”从四川启程、乘坐专机前往卡塔尔，
  //    标志着我国与中东地区首例大熊猫保护研究合作之旅正式启动。根据最新消息，目前专机已经抵达卡塔尔首都多哈。为迎接“四海”“京京”的到来，卡塔尔政府精心建`
  // );
  textBlock.formText(text);
  const time = Date.now();
  textBlock.layout(context, {
    x: 100,
    y: 100,
    width: 800,
  });
  console.info(
    textBlock,
    "cost time",
    Date.now() - time,
    "length",
    text.length
  );
}

class CacheCanvas {
  offScreen: HTMLCanvasElement | null = null;
  create(copy: HTMLCanvasElement) {
    const canvas = document.createElement("canvas");
    canvas.width = copy.width;
    canvas.height = copy.height;
    const context = canvas.getContext("2d")!;
    renderHighDPI(canvas, context);
    this.offScreen = this.offScreen;
  }
}

class TZ {
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  cacheContext: CanvasRenderingContext2D;
  ratio: number = 1;
  constructor(canvas: HTMLCanvasElement) {
    this.ratio = window.devicePixelRatio;
    this.canvas = canvas;
    this.context = canvas.getContext("2d")!;
    this.renderHighDPI(canvas, this.context);
    this.cacheContext = this.initOffScreen(canvas);
  }

  initOffScreen(copy: HTMLCanvasElement) {
    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.left = "-9999px";
    document.body.appendChild(canvas);
    canvas.width = copy.width;
    canvas.height = copy.height * 2;
    const context = canvas.getContext("2d")!;
    this.renderHighDPI(canvas, context);
    return context;
  }

  renderHighDPI(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
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

  render() {
    //
  }

  renderText() {
    const textBlock = new TextBlock();
    textBlock.formText(text);
    const time = Date.now();
    textBlock.layout(this.context, {
      x: 100,
      y: 100,
      width: 800,
    });
    console.info(
      textBlock,
      "cost time",
      Date.now() - time,
      "length",
      text.length
    );
    // this.cacheContext.drawImage(this.canvas, 0, 0)
    this.cacheContext.putImageData(
      this.context.getImageData(0, 0, this.canvas.width, 3000),
      0,
      0,
      0,
      0,
      this.canvas.width,
      3000
    );
    console.info(
      "drawImage cost time",
      Date.now() - time,
      "length",
      text.length
    );
  }

  move(delta: number) {
    const imageData = this.cacheContext.getImageData(
      0,
      delta,
      this.canvas.width,
      this.canvas.height
    );
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.putImageData(imageData, 0, 0);
  }

  renderGrid() {
    // 画横线
    const step = 10;
    let xIndex = 9.5;
    let yIndex = 9.5;
    const height = 800.5;
    const width = 1000.5;
    this.context.lineWidth = 1;
    this.context.strokeStyle = "#ccc";
    for (; xIndex < width; xIndex += step) {
      this.context.beginPath();
      this.context.moveTo(xIndex, 0);
      this.context.lineTo(xIndex, height);
      if ((xIndex - 0.5 + 1) % 100 === 0) {
        this.context.strokeStyle = "rgba(255,0,0,0.5)";
      } else {
        this.context.strokeStyle = "#ccc";
      }
      this.context.stroke();
    }
    for (; yIndex < height; yIndex += step) {
      this.context.beginPath();
      this.context.moveTo(0, yIndex);
      this.context.lineTo(width, yIndex);
      if ((yIndex - 0.5 + 1) % 100 === 0) {
        this.context.strokeStyle = "rgba(255,0,0,0.5)";
      } else {
        this.context.strokeStyle = "#ccc";
      }
      this.context.stroke();
    }
  }
}

class TextBlock {
  ratio: number = 1;
  style: Style = new Style();
  sizeChangeHandler: Array<(newHeight: number, oldHeigh: number) => void> = [];
  content: Text[] = [];
  lines: Text[][] = [[]];
  height: number = 0;
  renderPosition: { x: number; y: number; width: number } = {
    x: 0,
    y: 9,
    width: 0,
  };
  actualRect: { x: number; y: number; height: number; width: number } = {
    x: 0,
    y: 9,
    height: 0,
    width: 0,
  };
  onSizeChange = (fn: (newHeight: number, oldHeigh: number) => void) => {
    this.sizeChangeHandler.push(fn);
  };
  render(context: CanvasRenderingContext2D) {
    //
  }

  fromObject(data: {}) {}

  move(context: CanvasRenderingContext2D, delta?: number) {
    const imageData = context.getImageData(
      100 * this.ratio,
      100 * this.ratio,
      800 * this.ratio,
      1000 * this.ratio
    );
    context.clearRect(
      100 * this.ratio,
      70 * this.ratio,
      800 * this.ratio,
      1000 * this.ratio
    );
    renderGrid(context);
    context.putImageData(
      imageData,
      100 * this.ratio,
      70 * this.ratio,
      0,
      0,
      800 * this.ratio,
      1000 * this.ratio
    );
  }

  cacheBlock(context: CanvasRenderingContext2D) {
    //
  }

  actualX() {}

  actualY() {}

  layout(
    context: CanvasRenderingContext2D,
    position: {
      x: number;
      y: number;
      width: number;
    }
  ) {
    this.renderPosition = position;
    // 计算所有 text 的宽高
    this.content.forEach((text) => {
      text.calSize(context);
    });

    let lastStyle: Style | undefined = undefined;
    /* 生成 lines */
    let stepX = 0;
    this.content.forEach((text) => {
      stepX += text.width;
      if (stepX > position.width || text.text === "\n") {
        this.lines[this.lines.length] = [text];
        stepX = text.width;
      } else {
        this.lines[this.lines.length - 1].push(text);
      }
    });
    /* 根据所在行，设置每一行的高度 */
    const lineHeights = this.lines.map((line) =>
      line.reduce((p, n) => Math.max(p, n.height), 0)
    );

    /* 计算实际 block 块所在 canvas 的矩形框 */
    this.actualRect.x = position.x;
    this.actualRect.y =
      position.y - this.lines[0].reduce((p, n) => Math.max(p, n.height), 0);
    this.actualRect.width = position.width;
    this.actualRect.height = this.lines.reduce(
      (p, n) => (p += n.reduce((p1, n1) => Math.max(p1, n1.height), 0)),
      0
    );

    // 渲染文本
    let startX = position.x;
    let startY = position.y;
    this.lines.forEach((line, lineIndex) => {
      line.forEach((text) => {
        text.content.forEach((char) => {
          char.style.setStyle(context, lastStyle);
          context.fillText(char.content, startX, startY);
          startX += char.width;
          lastStyle = char.style;
        });
      });
      startY += lineHeights[lineIndex] * 1.5;
      startX = position.x;
    });

    // 下一步，支持滚动
    // 下下一步，支持编辑输入
  }

  formText(data: string) {
    const texts = data.split(/[ ,，。.;；]/);
    let textIndex = 0;
    texts.forEach((text, tIndex) => {
      textIndex += text.length + 1;
      const lastCharacter = data[textIndex - 1] ? data[textIndex - 1] : "";
      /* 如果 text 不是纯英文或者数字，则需要拆成 text，这样换行的时候，他们不作为整体换行 */
      // TODO: 识别连续英文，单独分隔
      if (!/^[a-zA-Z0-9]+$/g.test(text)) {
        /* 如果是符号后面跟着英文，则需要拆分 */
        text.split("").forEach((sText) => {
          const sTextInstance = new Text();
          sTextInstance.text = sText;
          const charInstance = new Character(sText);
          sTextInstance.content.push(charInstance);
          this.content.push(sTextInstance);
        });
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
        text.split("").forEach((character) => {
          const charInstance = new Character(character);
          textInstance.content.push(charInstance);
        });
        if (lastCharacter) {
          const charInstance = new Character(lastCharacter);
          textInstance.content.push(charInstance);
        }
        this.content.push(textInstance);
      }
    });
  }
}

class Text {
  index: number = 0;
  text: string = "";
  content: Character[] = [];
  style: Style = new Style();
  get width() {
    return this.content.reduce((p, n) => (p += n.width), 0);
  }
  get height() {
    let maxHeight = 0;
    this.content.forEach((char) => {
      maxHeight = Math.max(char.height, maxHeight);
    });
    return maxHeight;
  }

  get last() {
    return this.content[this.content.length - 1];
  }

  calSize(context: CanvasRenderingContext2D) {
    this.content.forEach((char) => {
      char.calSize(context);
    });
  }

  layout() {}

  render() {}
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
    x: 0,
    y: 0,
  };
  constructor(content: string) {
    this.content = content;
  }

  calSize(context: CanvasRenderingContext2D) {
    if (this.content === "\n") {
      this.width = 0;
    } else {
      this.style.setStyle(context);
      const textMetric = context.measureText(this.content);
      this.width = textMetric.width;
      this.height =
        textMetric.fontBoundingBoxAscent + textMetric.fontBoundingBoxDescent;
    }
  }

  layout() {
    //
  }

  get isBreak() {
    return this.content === "\n";
  }

  get isBlank() {
    return this.content === " ";
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
    fontFamily: string;
  } = {
    fontSize: 30,
    lineHeight: 1.5,
    fontFamily: "palatino",
  };
  paint: {
    color: string;
    bgColor: string;
  } = {
    color: "#000",
    bgColor: "#fff",
  };

  setStyle(context: CanvasRenderingContext2D, lastStyle?: Style) {
    if (!lastStyle || !this.isEqual(lastStyle)) {
      context.font = `${this.layout.fontSize}px ${this.layout.fontFamily}`;
      context.strokeStyle = `${this.paint.color}`;
    }
  }

  needReflow(fontSize: number, lineHeight: number, fontFamily: string) {
    return (
      this.layout.fontSize !== fontSize ||
      this.layout.lineHeight !== lineHeight ||
      this.layout.fontFamily !== fontFamily
    );
  }

  needRepaint(color: string, bgColor: string) {
    return this.paint.bgColor !== bgColor || this.paint.color !== color;
  }

  isEqual(style: Style) {
    return (
      this.needReflow(
        style.layout.fontSize,
        style.layout.lineHeight,
        style.layout.fontFamily
      ) || this.needRepaint(style.paint.color, style.paint.bgColor)
    );
  }
}

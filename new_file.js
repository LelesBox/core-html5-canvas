/* eslint-disable no-console */
// 快速创建一个文件脚本
// 接收参数为章节号 比如 node ./new_file.js --f 2-6
// 如果有重复，则报错
const fs = require('fs');
const path = require('path');
const { Command } = require('commander');

const vueTemplate = `
<template>
  <div>
    <div id="readout"></div>
    <canvas id="canvas" width="800" height="550">
      Canvas Not Support
    </canvas>
  </div>
</template>

<script>
import { run } from './run';
export default {
  mounted() {
    run();
  }
}
</script>

<style scoped>
  #canvas {
    position: absolute;
    left: 0px;
    top: 20px;
    margin: 20px;
    background: #ffffff;
    border: thin inset rgba(100, 150, 230, 0.5);
    cursor: pointer;
  }
  #readout {
    margin-top: 10px;
    margin-left: 15px;
    color: blue;
    user-select: none;
  }
</style>
`
const runTemplate = `export function run() {
  var canvas = document.getElementById('canvas') as HTMLCanvasElement
  var context = canvas.getContext('2d')!
  console.log('hello world')
}
`
const root = path.resolve(__dirname, './src');

function buildRoutTemplate() {
  let directory = fs.readdirSync(path.join(root, './chapters'));
  directory = directory.filter(dir => dir !== 'index.ts');
  const imports = directory.map(dir => `import Chapter${dir.replace(/-/g, '_')} from './${dir}/index.vue'`).join('\n')
  const ChapterList = 
`const ChapterList: [string, any][] = [
${directory.map(dir => `  ['${dir}', Chapter${dir.replace(/-/g, '_')}],`).join('\n')}
]`
  const end = `export const Chapters: { name: string, path: string, component: any }[] = 
ChapterList.map(c => ({
  name: c[0],
  path: \`/\${c[0]}\`,
  component: c[1],
}));`
  const template = [imports, ChapterList, end].join('\n\n');
  return template;
}

function createNewChapter(chaptersNumber) {
  const chapterRoot = path.join(root, './chapters');
  let directory = fs.readdirSync(chapterRoot);
  if (directory.find(dir => dir === chaptersNumber)) {
    throw new Error(chaptersNumber + ' 已存在');
  }

  if (chaptersNumber) {
    /* 创建文件夹 */
    fs.mkdirSync(path.join(chapterRoot, chaptersNumber));
    /* 创建 index.vue */
    fs.writeFileSync(path.join(chapterRoot, chaptersNumber, 'index.vue'), vueTemplate);
    /* 创建 run.ts */
    fs.writeFileSync(path.join(chapterRoot, chaptersNumber, 'run.ts'), runTemplate);
  }
  /* 更新 route */
  const route = buildRoutTemplate();
  fs.writeFileSync(path.join(chapterRoot, 'index.ts'), route);
  if (chaptersNumber) {
    console.log(`create ${chaptersNumber} done...`);
  } else {
    console.log('refresh done..');
  }
}

const program = new Command();
program.option('-a --add <chapter>', '新增一个章节');
program.option('-r --refresh', '更新路由');
program.parse(process.argv);
const options = program.opts();
if (options.add) {
  createNewChapter(options.add);
} else if (options.refresh) {
  createNewChapter();
}
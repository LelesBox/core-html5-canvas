import Chapter1_4 from './1-4/index.vue'
import Chapter1_6 from './1-6/index.vue'
import Chapter1_8 from './1-8/index.vue'
import Chapter2_1 from './2-1/index.vue'
import Chapter2_5 from './2-5/index.vue'
import Chapter2_5_1 from './2-5-1/index.vue'
import Chapter2_5_2 from './2-5-2/index.vue'
import Chapter2_6_阴影 from './2-6_阴影/index.vue'
import Chapter2_7_2_剪纸效果 from './2-7_2_剪纸效果/index.vue'
import Chapter2_7_路径描边填充 from './2-7_路径描边填充/index.vue'
import Chapter3_1_渲染文本 from './3_1_渲染文本/index.vue'
import Chapter3_2_渲染文本_渐变 from './3_2_渲染文本-渐变/index.vue'
import Chapter3_3_渲染文本_字体 from './3_3_渲染文本-字体/index.vue'
import Chapter3_4_渲染文本_定位 from './3_4_渲染文本-定位/index.vue'
import Chapter3_7_坐标轴文本 from './3_7_坐标轴文本/index.vue'
import Chapter3_9_圆弧绘制文本 from './3_9_圆弧绘制文本/index.vue'
import Chapter3_10_文本光标 from './3_10_文本光标/index.vue'
import Chapter3_16_文本编辑器 from './3_16_文本编辑器/index.vue'
import Chapter4_1_图片绘制 from './4_1_图片绘制/index.vue'

const ChapterList: [string, any][] = [
  ['1-4', Chapter1_4],
  ['1-6', Chapter1_6],
  ['1-8', Chapter1_8],
  ['2-1', Chapter2_1],
  ['2-5', Chapter2_5],
  ['2-5-1', Chapter2_5_1],
  ['2-5-2', Chapter2_5_2],
  ['2-6_阴影', Chapter2_6_阴影],
  ['2-7_2_剪纸效果', Chapter2_7_2_剪纸效果],
  ['2-7_路径描边填充', Chapter2_7_路径描边填充],
  ['3_1_渲染文本', Chapter3_1_渲染文本],
  ['3_2_渲染文本-渐变', Chapter3_2_渲染文本_渐变],
  ['3_3_渲染文本-字体', Chapter3_3_渲染文本_字体],
  ['3_4_渲染文本-定位', Chapter3_4_渲染文本_定位],
  ['3_7_坐标轴文本', Chapter3_7_坐标轴文本],
  ['3_9_圆弧绘制文本', Chapter3_9_圆弧绘制文本],
  ['3_10_文本光标', Chapter3_10_文本光标],
  ['3_16_文本编辑器', Chapter3_16_文本编辑器],
  ['4_1_图片绘制', Chapter4_1_图片绘制],
]

export const Chapters: { name: string, path: string, component: any }[] = 
ChapterList.map(c => ({
  name: c[0],
  path: `/${c[0].slice(0, c[0].lastIndexOf('_'))}`,
  component: c[1],
}));
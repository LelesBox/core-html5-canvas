import Chapter1_4 from './1-4/index.vue'
import Chapter1_6 from './1-6/index.vue'
import Chapter1_8 from './1-8/index.vue'
import Chapter2_1 from './2-1/index.vue'
import Chapter2_5 from './2-5/index.vue'
import Chapter2_5_1 from './2-5-1/index.vue'

const ChapterList: [string, any][] = [
  ['1-4', Chapter1_4],
  ['1-6', Chapter1_6],
  ['1-8', Chapter1_8],
  ['2-1', Chapter2_1],
  ['2-5', Chapter2_5],
  ['2-5-1', Chapter2_5_1],
]

export const Chapters: { name: string, path: string, component: any }[] = 
ChapterList.map(c => ({
  name: c[0],
  path: `/${c[0]}`,
  component: c[1],
}));
<template>
<div>
  <div class="c-header">
    <img class="c-header-img" src="../assets/Learn Canvas.png" alt="">
  </div>
  <div class="c-chapters">
    <div class="c-chapter" v-for="(chapter, index) in chapters" :key="index">
      <div class="c-chapter-item">
        <router-link :to="chapter.path">
          <img class="fit-img" src="../assets/folder.svg" alt="">
          <div>
            {{chapter.name}}
          </div>
        </router-link>
      </div>
    </div>
    <div class="c-chapter c-chapter-placeholder" v-for="n in 20" :key="n + 'placeholder'"></div>
  </div>
</div>
</template>
<script>
import { Chapters } from '../chapters'

export default {
  data() {
    return {
      chapters: Chapters
    }
  }
}
</script>
<style lang="less">
.c-header {
  height: 300px;
  background-color: #cccccc;
  .c-header-img {
    width: 100%;
  }
}
.fit-img {
  width: 100%;
}
.c-chapters {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  * {
    text-decoration: none;
  }
  .c-chapter {
    width: 150px;
    height: 150px;
    padding: 10px 10px 20px;
    box-sizing: border-box;
    .c-chapter-item {
      height: 100%;
    }
  }
  .c-chapter-placeholder {
    padding: 0;
    height: 0;
  }
}
</style>

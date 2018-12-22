<template>
  <canvas id="canvas" width="600" height="600">
    Canvas Not Support
  </canvas>
</template>
<style lang="less" scoped>
  #canvas {
    margin: 10px;
    padding: 10px;
    background: #ffffff;
    border: thin inset #aaaaaa;
  }
</style>
<script lang="ts">
import Vue from 'vue'
import { run } from './main'
export default {
  mounted() {
    run()
  }
}
</script>

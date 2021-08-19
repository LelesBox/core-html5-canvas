
<template>
  <div>
    <div id="readout"></div>
    <canvas id="canvas" width="1000" height="650">
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

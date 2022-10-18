
<template>
  <div>
    <div id="readout">
      <span style="font-size:16px; font-family:palatino">XHello world</span>
    </div>
    <canvas id="canvas" width="1000" height="600">
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

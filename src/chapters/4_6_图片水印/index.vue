
<template>
  <div class="container">
    <div id="readout"></div>
    <!-- <label for="scale" style="padding: 20px">
      Scale image to canvas
      <input type="checkbox" name="scale" id="scale">
    </label> -->
    <div class="controls">
      <output id="scaleOutput">1.0</output>
      <input type="range" name="" id="scaleSlider" min="1" max="3" step="0.01" value="1.0">
    </div>
    <br>
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
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  #canvas {
    /* position: absolute; */
    left: 0px;
    top: 20px;
    margin: 20px;
    background: #ffffff;
    border: thin inset rgba(100, 150, 230, 0.5);
    cursor: pointer;
    width: 800px;
    height: 550px;
  }
  #readout {
    margin-top: 10px;
    margin-left: 15px;
    color: blue;
    user-select: none;
  }
</style>

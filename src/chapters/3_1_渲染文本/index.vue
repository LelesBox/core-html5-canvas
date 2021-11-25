
<template>
  <div>
    <div id="readout"></div>
    <div style="padding-left:20px">
      <label for="fillCheckbox">
        fillCheckbox
        <input type="checkbox" name="fillCheckbox" id="fillCheckbox" />
      </label>
      <label for="strokeCheckbox">
        strokeCheckbox
        <input type="checkbox" name="strokeCheckbox" id="strokeCheckbox" />
      </label>
      <label for="shadowCheckbox">
        shadowCheckbox
        <input type="checkbox" name="shadowCheckbox" id="shadowCheckbox" />
      </label>
    </div>
    <canvas id="canvas" width="800" height="550"> Canvas Not Support </canvas>
  </div>
</template>

<script>
import { run } from "./run";
export default {
  mounted() {
    run();
  },
};
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

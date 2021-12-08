
<template>
  <div>
    <div id="fontSelectDiv" style="padding: 20px">
      Font:
      <select id="fontSelect">
        <option value="Arial">Arial</option>
        <option value="Comic Sans" selected>Comic Sans</option>
        <option value="Lucida Sans">Lucida Sans</option>
        <option value="Helvetica">Helvetica</option>
        <option value="Palatino">Palatino</option>
      </select>

      Size:
      <select id="sizeSelect">
        <option value="32">32 px</option>
        <option value="48" selected>48 px</option>
        <option value="64">64 px</option>
        <option value="128">128 px</option>
      </select>

      Text stroke color:
      <select id="strokeStyleSelect">
        <option value="red">red</option>
        <option value="green">green</option>
        <option value="blue">blue</option>
        <option value="orange">orange</option>
        <option value="cornflowerblue">cornflowerblue</option>
        <option value="goldenrod">goldenrod</option>
        <option value="navy" selected>navy</option>
        <option value="purple">purple</option>
      </select>

      Text fill color:
      <select id="fillStyleSelect">
        <option value="rgba(255,0,0,0.5)">semi-transparent red</option>
        <option value="green">green</option>
        <option value="rgba(0,0,255,0.5)" selected>
          semi-transparent blue
        </option>
        <option value="orange">orange</option>
        <option value="rgba(100,140,230,0.5)">
          semi-transparent cornflowerblue
        </option>
        <option value="rgba(218,165,32,0.5)">semi-transparent goldenrod</option>
        <option value="navy">navy</option>
        <option value="purple">purple</option>
      </select>
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
  left: 0px;
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

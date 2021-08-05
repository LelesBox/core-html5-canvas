
<template>
  <div>
    <div id="radios">
      <label for="repeatRadio">
        <input
          type="radio"
          id="repeatRadio"
          name="patternRadio"
          checked
        /> repeat
      </label>
      <label for="repeatXRadio">
        <input type="radio" id="repeatXRadio" name="patternRadio" /> repeat-x
      </label>
      <label for="repeatYRadio">
        <input type="radio" id="repeatYRadio" name="patternRadio" /> repeat-y
      </label>
      <label for="noRepeatRadio">
        <input type="radio" id="noRepeatRadio" name="patternRadio" /> no repeat
      </label>
    </div>
    <div id="readout"></div>
    <canvas id="canvas" width="450" height="275"> Canvas Not Support </canvas>
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

<style scoped lang="less">
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
#radios {
  padding: 18px;
  display: flex;
  align-items: center;
  label {
    display: inline-flex;
    align-items: center;
    margin-right: 15px;
    input {
      margin-right: 5px;
    }
  }
}
</style>

<template>
  <div style="width: 100%; height: 100%">
    <div id="glasspane">
      <h2 class="title">Bouncing Ball</h2>
      <p>One hundred balls bouncing</p>
      <a id="startButton">Start</a>
    </div>
    <canvas id="canvas" width="750" height="500">Canvas Not Support</canvas>
  </div>
</template>

<script>
// import { run } from "./run";
export default {
  mounted() {
    // run()
  },
};
</script>

<style lang="less" scoped>
#canvas {
  margin-left: 10px;
  margin-top: 10px;
  background: #ffffff;
  border: thin solid #aaaaaa;
}
#glasspane {
  position: absolute;
  left: 50px;
  top: 50px;
  padding: 0 20px 10px 10px;
  background: rgba(0, 0, 0, 0.3);
  border: thin solid rgba(0, 0, 0, 0.6);
  color: #eeeeee;
  // font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 12px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.5) 5px 5px 20px;
  h2 {
    font-weight: normal;
  }
  .title {
    font-size: 2em;
    color: rgba(255, 255, 0, 0.8);
  }
  a:hover {
    color: yellow;
  }
  a {
    text-decoration: none;
    color: #cccccc;
    font-size: 3.5em;
  }
  p {
    margin: 1px;
    color: rgba(65, 65, 220);
    font-size: 12pt;
    // font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  }
}
</style>

<template>
  <div class="app-container h-screen w-screen overflow-hidden">
    <MacDesktop />
  </div>
</template>

<script>
import MacDesktop from "./components/MacOS/Desktop.vue";

export default {
  name: "App",
  components: { MacDesktop },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
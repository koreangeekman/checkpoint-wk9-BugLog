<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer class="position-relative buggy">
    <div class="position-absolute w-100">
      <marquee behavior="alternate" direction="down" height="120px" width="100%" scrollamount="8">
        <i class="fs-1 mdi mdi-bug mdi-spin"></i>
        <marquee behavior="alternate" direction="right" height="200px" width="100%" scrollamount="42">
          <i class="fs-1 mdi mdi-bug mdi-spin"></i>
        </marquee>
      </marquee>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 64px);
}
</style>

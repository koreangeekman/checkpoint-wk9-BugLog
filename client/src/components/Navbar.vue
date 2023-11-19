<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light px-3">
    <router-link class="navbar-brand d-flex me-auto" :to="{ name: 'Home' }">
      <div class="d-flex align-items-center fs-1">
        <i class="mdi mdi-bug"></i>
        <p class="mb-0 ms-3 fw-bold"> Bug Log</p>
      </div>
    </router-link>
    <!-- LOGIN COMPONENT HERE -->
    <Login />
  </nav>
</template>


<script>
import Login from './Login.vue';

export default {
  setup() {
    return {}
  },
  components: { Login }
}
</script>


<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>

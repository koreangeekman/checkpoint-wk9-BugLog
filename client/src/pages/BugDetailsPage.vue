<template>
  <div class="container-fluid">
    <section class="row px-md-5">
      <div class="col-12 d-flex align-items-center px-4 pt-5">
        <p class="fs-3 mb-0 fw-bold">{{ bug.title }}</p>
        <button v-if="account.id" @click="editBug()" class="btn btn-primary">
          <i class="fs-1 mdi mdi-pencil"></i>
        </button>
      </div>
      <div class="col-12 p-3">
      </div>
    </section>
  </div>
</template>
 
 
<script>
import { useRoute } from "vue-router";
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import { bugsService } from "../services/BugsService.js";

export default {
  setup() {
    const route = useRoute();

    async function _getBugById() {
      try { await bugsService.getBugById(route.params.bugId); }
      catch (error) { Pop.error(error); }
    }

    onMounted(() => {
      if (!AppState.selectedBug || AppState.selectedBug.id != route.params.bugId) {
        _getBugById();
      }
    })

    return {
      account: computed(() => AppState.account),
      selectedBug: computed(() => AppState.selectedBug),

    }
  }
};
</script>
 
 
<style lang="scss" scoped></style>
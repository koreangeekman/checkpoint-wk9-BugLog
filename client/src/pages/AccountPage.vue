<template>
  <div class="container-fluid">
    <section class="row px-md-5">
      <div class="col-12 d-flex justify-content-between align-items-center px-4 pt-5">
        <p class="fs-3 mb-0 fw-bold">Bugs You're Tracking</p>
        <button v-if="account.id" @click="reportBug()" class="btn btn-primary">Report Bug</button>
      </div>
      <div class="col-12 p-3">
        <BugTable />
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import { bugsService } from "../services/BugsService.js";
import BugTable from "../components/BugTable.vue";

export default {
  setup() {

    async function _getTrackedBugsByAccount() {
      try { await bugsService.getTrackedBugsByAccount(); }
      catch (error) { Pop.error(error); }
    }

    onMounted(() => {
      _getTrackedBugsByAccount();
    });

    return {
      account: computed(() => AppState.account),

    };
  },
  components: { BugTable }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>

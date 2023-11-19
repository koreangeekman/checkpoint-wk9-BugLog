<template>
  <div class="container-fluid">
    <section class="row px-md-5">
      <div class="col-12 d-flex justify-content-between align-items-center px-4 pt-5">
        <p class="fs-3 mb-0 fw-bold">Bugs</p>
        <button v-if="account.id" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#bugForm">
          Report Bug
        </button>
      </div>
      <div class="col-12 p-3">
        <BugTable />
      </div>
    </section>
  </div>

  <ModalComponent :modalId="'bugForm'" :showFooter="false">
    <template #modalTitle>
      <span class="d-flex align-items-center">
        <i class="fs-3 mdi mdi-bug mdi-rotate-45"></i>
        <p class="mb-0 mx-3">Report a bug</p>
        <i class="fs-3 mdi mdi-bug mdi-spin"></i>
      </span>
    </template>
    <template #modalBody>
      <BugForm />
    </template>
  </ModalComponent>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { AppState } from '../AppState';
import { bugsService } from "../services/BugsService.js";
import BugForm from "../components/BugForm.vue";
import BugTable from "../components/BugTable.vue";
import ModalComponent from "../components/ModalComponent.vue";

export default {
  setup() {

    async function _getBugs() {
      try { await bugsService.getBugs(); }
      catch (error) { Pop.error(error); }
    }

    onMounted(() => {
      _getBugs();
    });

    return {

      account: computed(() => AppState.account),

    };
  },
  components: { BugTable, ModalComponent, BugForm }
}
</script>

<style scoped lang="scss"></style>

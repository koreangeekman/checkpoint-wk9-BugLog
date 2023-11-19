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
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';

export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
};
</script>
 
 
<style lang="scss" scoped></style>
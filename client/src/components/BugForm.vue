<template>
  <form @submit.prevent="submitForm()" class="d-flex flex-column">
    <span class="d-flex">
      <span class="w-100">
        <input v-model="bugForm.title" required class="form-control" maxlength="100" name="title" id="title" type="text"
          placeholder="Title the bug..">
        <textarea v-model="bugForm.description" required class="form-control my-3" maxlength="1000" name="description"
          id="description" rows="3" placeholder="Describe the bug.."></textarea>
      </span>
      <span class="m-3 mt-0 vert">
        <span class="d-flex justify-content-between nums">
          <p v-for="val in [...Array(5)].map((n, i) => i + 1).reverse()" class="vert-90">{{ val }}-</p>
        </span>
        <input v-model="bugForm.priority" type="range" name="priority" id="priority" min="1" max="5">
      </span>
    </span>
    <span class="d-flex align-items-center">
      <button class="btn btn-primary d-flex align-items-center text-nowrap fs-5">
        Submit <i class="fs-3 ms-2 mdi mdi-bug mdi-spin"></i>
      </button>
      <marquee direction="left" scrollamount="16" width="100%">
        <i class="fs-1 mdi mdi-bug mdi-spin"></i>
      </marquee>
    </span>
  </form>
</template>


<script>
import { ref, watchEffect } from 'vue';
import { Modal } from "bootstrap";
import Pop from "../utils/Pop.js";
import { useRouter } from "vue-router";
import { bugsService } from "../services/BugsService.js";
import { AppState } from "../AppState.js";

export default {
  props: { editMe: { type: Boolean, default: false } },

  setup(props) {
    const router = useRouter();

    const bugForm = ref({});

    watchEffect(() => {
      if (props.editMe) {
        bugForm.value = { ...AppState.selectedBug };
      } else {
        bugForm.value = { priority: 1 };
      }
    })

    return {
      bugForm,

      submitForm() {
        if (props.editMe) {
          this.updateBug();
        } else {
          this.reportBug();
        }
      },

      async updateBug() {
        try {
          await bugsService.updateBug(bugForm.value);
          Modal.getOrCreateInstance('#editBugForm').hide();
        }
        catch (error) { Pop.error(error); }
      },

      async reportBug() {
        try {
          const newBug = await bugsService.reportBug(bugForm.value);
          bugForm.value = { priority: 1 };
          router.push({ name: 'BugDetails', params: { bugId: newBug.id } });
          Modal.getOrCreateInstance('#bugForm').hide();
        }
        catch (error) { Pop.error(error); }
      },


    }
  }
};
</script>


<style lang="scss" scoped>
.vert {
  writing-mode: vertical-lr;
}

.nums {
  padding-top: 0;
  padding-bottom: .8rem;
}

.vert-90 {
  transform: rotate(-90deg);
  margin: 0;
}
</style>
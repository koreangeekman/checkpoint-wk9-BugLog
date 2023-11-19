<template>
  <form @submit.prevent="reportBug()" class="d-flex flex-column">
    <span class="d-flex">
      <span class="w-100">
        <input v-model="bugForm.title" required class="form-control" maxlength="50" name="title" id="title" type="text"
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
    <button class="btn btn-primary align-self-end">Submit bug</button>
  </form>
</template>


<script>
import { ref } from 'vue';
import { Modal } from "bootstrap";
import Pop from "../utils/Pop.js";
import { useRouter } from "vue-router";
import { bugsService } from "../services/BugsService.js";

export default {
  setup() {
    const router = useRouter();

    const bugForm = ref({ priority: 1 });

    return {
      bugForm,

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
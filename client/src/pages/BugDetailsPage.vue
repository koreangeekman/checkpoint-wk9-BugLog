<template>
  <div class="container-fluid">
    <section class="row px-md-5">
      <div class="col-12 pt-5 d-flex">
        <span class="d-flex align-items-center rounded-top title shadow">
          <p v-if="selectedBug?.id" class="fs-3 mb-0 p-3 h-100 fw-bold">{{ selectedBug?.title }}</p>
          <button v-if="account.id" @click="editBug()" class="btn btn-primary">
            <i class="fs-1 mdi mdi-pencil"></i>
          </button>
        </span>
      </div>
      <div class="col-12">
        <div class="heading rounded-end rounded-bottom shadow p-3">
          <div class="bg-light rounded shadow p-3" v-if="selectedBug">
            <BugCard :bug="selectedBug" />
            <span class="d-flex align-items-center">
              <button v-if="account.id" class="btn btn-success fs-5" @click="trackBug()">
                <i class="mdi mdi-magnify"></i> Track
              </button>
              <div v-for="tracker in trackers" class="ms-1">
                <img :src="tracker.tracker.picture" :alt="tracker.tracker.name"
                  class="tracker border border-dark rounded">
              </div>
            </span>
          </div>
        </div>
      </div>
    </section>
    <section class="row px-md-5">
      <div class="col-12 pt-5">
        <div class="p-3">
          <div class="border border-dark rounded d-flex flex-column align-items-start">
            <p class="fs-1 px-5 border-end border-bottom border-dark rounded title">Notes</p>
            <form v-if="account.id" @submit.prevent="addNote()" class="w-100">
              <div class="px-5 py-3">
                <textarea v-model="noteForm.body" name="noteForm" id="noteForm" cols="30" rows="3"
                  class="form-control shadow" placeholder="Write something..."></textarea>
              </div>
              <div class="px-5 pb-3 text-end">
                <button class="btn btn-primary shadow" type="submit">send note</button>
              </div>
            </form>
            <div v-for="note in notes" class="my-2">
              <div class="title">{{ note.creator.email }}</div>
              <div class="body">{{ note.body }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
 
 
<script>
import { useRoute } from "vue-router";
import { AppState } from '../AppState';
import { computed, onMounted, ref } from 'vue';
import { bugsService } from "../services/BugsService.js";
import BugCard from "../components/BugCard.vue";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const route = useRoute();

    const noteForm = ref({});

    async function _getBugById() {
      try {
        await bugsService.getBugById(route.params.bugId);
      }
      catch (error) {
        Pop.error(error);
      }
    }
    async function _getTrackersByBugId() {
      try {
        await bugsService.getTrackersByBugId(route.params.bugId);
      }
      catch (error) {
        Pop.error(error);
      }
    }
    onMounted(() => {
      if (!AppState.selectedBug || AppState.selectedBug.id != route.params.bugId) {
        _getBugById();
      }
      if (!AppState.trackers || AppState.trackers.bugId != route.params.bugId) {
        _getTrackersByBugId();
      }
    });
    return {
      noteForm,

      account: computed(() => AppState.account),
      trackers: computed(() => AppState.trackers),
      notes: computed(() => AppState.notes),
      selectedBug: computed(() => AppState.selectedBug),

      async trackBug() {
        try { await bugsService.trackBug(this.selectedBug.id, this.account.id); }
        catch (error) { Pop.error(error); }
      },

      async addNote() {
        try { await notesService.addNote(noteForm); }
        catch (error) { Pop.error(error); }
      }

    };
  },
  components: { BugCard }
};
</script>
 
 
<style lang="scss" scoped>
.title {
  background-color: yellowgreen;
}

.body {
  background-color: lightblue;
}

.heading {
  background-color: skyblue;
  border: 2px solid skyblue;
}

.tracker {
  border: 1px solid black;
  height: 3rem;
}
</style>
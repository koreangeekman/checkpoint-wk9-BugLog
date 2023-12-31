<template>
  <div class="container-fluid">
    <section class="row px-md-5">
      <div class="col-12 pt-5 d-flex">
        <span class="d-flex align-items-center rounded-top title shadow">
          <p v-if="selectedBug?.id" class="fs-3 mb-0 p-3 h-100 fw-bold">{{ selectedBug?.title }}</p>
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editBugForm"
            v-if="selectedBug?.creatorId == account.id && !selectedBug?.closed">
            <i class="fs-1 mdi mdi-pencil"></i>
          </button>
        </span>
      </div>
      <div class="col-12">
        <div class="heading rounded-end rounded-bottom shadow p-3">
          <div class="bg-light rounded shadow p-3" v-if="selectedBug?.id">
            <BugCard :bug="selectedBug" />
            <span class="d-flex align-items-center">
              <button v-if="account.id" class="btn btn-success fs-5" @click="trackBug()">
                <i class="mdi mdi-magnify"></i> Track
              </button>
              <div v-for="tracker in trackers" class="ms-1">
                <img :src="tracker.tracker.picture" :alt="tracker.tracker.name" :title="tracker.tracker.name"
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
                  class="form-control shadow" maxlength="1000" placeholder="Write something..."></textarea>
              </div>
              <div class="px-5 pb-3 text-end">
                <button class="btn btn-primary shadow" type="submit">send note</button>
              </div>
            </form>

            <div v-for="note in notes" class="my-2 mx-5">
              <span class="d-flex shadow">
                <span class="d-flex align-items-center rounded-top rounded-end shadow title">
                  <img :src="note.creator.picture" :alt="note.creator.name" :title="note.creator.name"
                    class="noteImg rounded m-2">
                  <p class="mb-0 me-2">{{ note.creator.email }}</p>
                </span>
                <span v-if="note.creatorId == account.id" class="">
                  <button v-if="false" @click="editNote(note)" class="btn btn-primary rounded-top">
                    <i class="fs-1 mdi mdi-pencil"></i>
                  </button>
                  <button @click="removeNote(note)" class="btn btn-danger rounded-top">
                    <i class="fs-1 mdi mdi-trash-can"></i>
                  </button>
                </span>
              </span>
              <div class="body mb-2 p-3 shadow rounded-bottom w-100">
                <p class="mb-0">
                  {{ note.body }}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  </div>
  <ModalComponent :modalId="'editBugForm'" :showFooter="false" :editMe="true">
    <template #modalTitle>Update bug
      <i class="mdi mdi-bug"></i>
    </template>
    <template #modalBody>
      <BugForm :editMe="true" />
    </template>
  </ModalComponent>
</template>
 
 
<script>
import { useRoute } from "vue-router";
import { AppState } from '../AppState';
import { computed, onMounted, ref } from 'vue';
import Pop from "../utils/Pop.js";
import BugCard from "../components/BugCard.vue";
import ModalComponent from "../components/ModalComponent.vue";
import { bugsService } from "../services/BugsService.js";
import BugForm from "../components/BugForm.vue";

export default {
  setup() {
    const route = useRoute();

    const noteForm = ref({});

    async function _getBugById() {
      try { await bugsService.getBugById(route.params.bugId); }
      catch (error) { Pop.error(error); }
    }
    async function _getTrackersByBugId() {
      try { await bugsService.getTrackersByBugId(route.params.bugId); }
      catch (error) { Pop.error(error); }
    }
    async function _getNotesByBugId() {
      try { await bugsService.getNotesByBugId(route.params.bugId); }
      catch (error) { Pop.error(error); }
    }

    onMounted(() => {
      if (!AppState.selectedBug || AppState.selectedBug.id != route.params.bugId) {
        _getBugById();
      }
      if (!AppState.trackers || AppState.trackers.bugId != route.params.bugId) {
        _getTrackersByBugId();
      }
      if (!AppState.notes || AppState.notes.bugId != route.params.bugId) {
        _getNotesByBugId();
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
        try {
          noteForm.value.bugId = this.selectedBug.id;
          await bugsService.addNote(noteForm.value);
          noteForm.value = {};
        }
        catch (error) { Pop.error(error); }
      },

      async removeNote(noteObj) {
        try {
          const yes = await Pop.confirm('Delete this note?');
          if (!yes) { return }
          await bugsService.removeNote(noteObj);
        }
        catch (error) { Pop.error(error); }
      }

    };
  },
  components: { BugCard, ModalComponent, BugForm }
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

.noteImg {
  border: 1px solid black;
  height: 3rem;
}
</style>
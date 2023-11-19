<template>
  <div class="container-fluid">
    <section class="row px-md-5">
      <div class="col-12 pt-5 d-flex">
        <span class="d-flex align-items-center rounded-top title">
          <p v-if="selectedBug?.id" class="fs-3 mb-0 p-3 h-100 fw-bold">{{ selectedBug?.title }}</p>
          <button v-if="account.id" @click="editBug()" class="btn btn-primary">
            <i class="fs-1 mdi mdi-pencil"></i>
          </button>
        </span>
      </div>
      <div class="col-12">
        <div class="heading rounded-end rounded-bottom p-3">
          <div class="bg-light border border-dark rounded p-3" v-if="selectedBug">
            <BugCard :bug="selectedBug" />
            <span class="d-flex">
              <button v-if="account.id" class="btn btn-success fs-5" @click="trackBug()">
                <i class="mdi mdi-magnify"></i> Track
              </button>
              <div v-for="tracker in trackers" class="mx-1">
                <img :src="tracker.picture" :alt="tracker.name" class="tracker border border-dark rounded m-1">
              </div>
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
 
 
<script>
import { useRoute } from "vue-router";
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import { bugsService } from "../services/BugsService.js";
import BugCard from "../components/BugCard.vue";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const route = useRoute();
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
        _getTrackersByBugId();
      }
    });
    return {
      account: computed(() => AppState.account),
      trackers: computed(() => AppState.trackers),
      selectedBug: computed(() => AppState.selectedBug),
      async trackBug() {
        try {
          await bugsService.trackBug(selectedBug.id);
        }
        catch (error) {
          Pop.error(error);
        }
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

.heading {
  background-color: skyblue;
  border: 2px solid skyblue;
}

.tracker {
  border: 1px solid black;
}
</style>
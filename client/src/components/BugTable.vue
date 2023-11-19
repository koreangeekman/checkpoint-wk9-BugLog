<template>
  <div class="heading p-3 border border-dark">

    <table class="bg-light w-100 border-bottom border-dark mb-4 ">
      <tr class="heading border-bottom border-dark fs-5">
        <th class="title px-2 mx-1 me-md-2 w-md-25">Title</th>
        <th class="mx-1 mx-md-2 d-flex align-items-center justify-content-center flex-wrap">
          <p class="mb-0 mx-1 me-md-2">Priority</p>
          <i class="fs-5 mdi mdi-sort px-1 rounded border border-dark bg-light my-1" type="button"
            @click="sortMethod()"></i>
        </th>
        <th class="reportedBy mx-1 mx-md-2 w-md-25">Reported By</th>
        <th class="lastUpdated mx-1 mx-md-2">Last Updated</th>
        <th class="filter d-flex justify-content-end">
          <span v-if="filterByState" type="button" @click="filterToggle()"
            class="d-flex align-items-center border border-dark bg-light rounded-pill">
            <p class="mb-0 mx-1 mx-md-2">Open Bugs</p>
          </span>
          <span v-else type="button" @click="filterToggle()"
            class="d-flex align-items-center border border-dark bg-light rounded-pill">
            <p class="mb-0 mx-1 mx-md-2">All Bugs</p>
            <div class="dot split rounded-circle"></div>
          </span>
        </th>
      </tr>
      <tr v-for="(bug, i) in bugs" class="border-start border-end border-dark fs-5"
        :class="i % 2 == 0 ? 'bg-light' : 'bg-secondary'">
        <BugList :bug="bug" />
      </tr>

    </table>

  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref } from 'vue';
import BugList from "./BugList.vue";

export default {
  setup() {
    const sortByPriority = ref(false);
    const filterByState = ref(false);

    return {
      sortByPriority,
      filterByState,
      bugs: computed(() => {
        let arr = [...AppState.bugs];
        if (filterByState.value) {
          arr = arr.filter(bug => !bug.closed);
        }
        if (sortByPriority.value) {
          return arr.sort((a, b) => b.priority - a.priority);
        }
        return arr;
      }),

      sortMethod() { sortByPriority.value = !sortByPriority.value; },
      filterToggle() { filterByState.value = !filterByState.value; },
    };
  },
  components: { BugList }
};
</script>


<style lang="scss" scoped>
.heading {
  background-color: skyblue;
}

.dot {
  height: 2rem;
  width: 2rem;
}

.split {
  background-image: linear-gradient(to right, orangered 50%, greenyellow 50%);
  border-left: 1px solid black;
}
</style>
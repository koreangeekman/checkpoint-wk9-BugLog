<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 d-flex justify-content-between align-items-center px-4 pt-3">
        <p class="fs-1 mb-0 fw-bold">Bugs</p>
        <button class="btn btn-primary">Report Bug</button>
      </div>
      <div class="col-12 p-3">
        <div class="heading p-3 border border-dark">

          <table class="bg-light w-100 border-bottom border-dark mb-4 ">
            <tr class="heading border-bottom border-dark fs-5">
              <th class="title px-2 mx-1 me-md-2 w-md-25">Title</th>
              <th class="mx-1 mx-md-2 d-flex align-items-center justify-content-center flex-wrap">
                <p class="mb-0 mx-1 me-md-2">Priority</p>
                <i class="fs-5 mdi mdi-sort px-1 rounded border border-dark" type="button" @click="sortMethod()"></i>
              </th>
              <th class="reportedBy mx-1 mx-md-2 w-md-25">Reported By</th>
              <th class="lastUpdated mx-1 mx-md-2">Last Updated</th>
              <th class="filter d-flex justify-content-center">
                <span class="d-flex align-items-center border border-dark bg-light rounded-pill" type="button"
                  @click="filterToggle()">
                  <p class="mb-0 mx-1 mx-md-2">All Bugs</p>
                  <div class="dot rounded-circle border border-dark"></div>
                </span>
              </th>
            </tr>

            <tr v-for="(bug, i) in bugs" class="border-start border-end border-dark fs-5"
              :class="i % 2 == 0 ? 'bg-light' : 'bg-secondary'">
              <td class="p-2">{{ bug.title }}</td>
              <td class="courier text-center">{{ bug.priority }}</td>
              <td class="courier">{{ bug.creator.email }}</td>
              <td class="courier">{{ day(bug.updatedAt) + ' ' + bug.updatedAt.toLocaleDateString() }}
              </td>
              <td class="d-flex align-items-center justify-content-center">
                <p class=" mb-0 me-2">{{ bug.closed ? 'Closed' : 'Open' }}</p>
                <div class="dot rounded-circle border border-dark" :class="bug.closed ? 'closed' : 'open'"></div>
              </td>
            </tr>

          </table>

        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { AppState } from "../AppState.js";
import { bugsService } from "../services/BugsService.js"

export default {
  setup() {

    const sortByPriority = ref(false);
    const filterByState = ref(false);

    async function _getBugs() {
      try {
        await bugsService.getBugs();
      }
      catch (error) { Pop.error(error) }
    }

    onMounted(() => {
      _getBugs();
    })

    return {
      sortByPriority,
      filterByState,

      bugs: computed(() => {
        let arr = [...AppState.bugs];
        if (filterByState.value) {
          arr = arr.filter(bug => !bug.closed);
        }
        if (sortByPriority.value) {
          return arr.sort((a, b) => b.priority - a.priority)
        }
        return arr
      }),

      day(date) {
        const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const day = week[date.getDay()];
        return day.slice(0, 3);
      },

      sortMethod() { sortByPriority.value = !sortByPriority.value; },
      filterToggle() { filterByState.value = !filterByState.value; },

    }
  }
}
</script>

<style scoped lang="scss">
.courier {
  font-family: 'Courier New', Courier, monospace;
}

.heading {
  background-color: skyblue;
}

.dot {
  height: 2rem;
  width: 2rem;
}

.priority {
  background-color: wheat;
}

.open {
  background-color: orangered;
}

.closed {
  background-color: greenyellow;
}
</style>

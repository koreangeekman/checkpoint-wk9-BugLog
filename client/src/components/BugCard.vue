<template>
  <div class="container-fluid" v-if="bug?.id">
    <section class="row">
      <div class="col-12 p-0">
        <section class="heading d-flex align-items-end justify-content-between">
          <span class="d-flex align-items-end">
            <img :src="bug.creator.picture" :alt="bug.creator.name" :title="bug.creator.name"
              class="border border-dark rounded">
            <span class="ms-3" :title="bug.creator.name">
              <p class="mb-0 text-secondary">Reported by</p>
              <p class="mb-0 fw-bold fs-5">{{ bug.creator.email }}</p>
            </span>
          </span>
          <span class="mx-3 text-center">
            <p class="mb-0 text-secondary">Priority</p>
            <p class="mb-0 fw-bold fs-5 rounded" :class="bug.priority == 5 ? 'highPriority' : ''">
              {{ bug.priority }}
            </p>
          </span>
          <span class="mx-3" :title="bug.updatedAt.toLocaleTimeString()">
            <p class="mb-0 text-secondary">Last Updated</p>
            <p class="mb-0 fw-bold fs-5 courier">{{ day(bug.updatedAt) + ' ' + bug.updatedAt.toLocaleDateString() }}</p>
          </span>
          <span v-if="!bug.closed" type="button" @click="closeBug(bug)"
            :class="bug.creatorId != account.id ? 'noClicky' : ''"
            class="mx-3 d-flex align-items-center rounded-pill border border-dark">
            <p class="mb-0 ms-4 me-3">Open</p>
            <div class="rounded-circle border-start border-dark dot open"></div>
          </span>
          <span v-else class="mx-3 d-flex align-items-center rounded-pill border border-dark">
            <div class="rounded-circle border-end border-dark dot closed"></div>
            <p class="mb-0 ms-3 me-4">Closed</p>
          </span>
        </section>
        <section class="border rounded my-4 p-2 fs-5">
          <p class="mb-0">{{ bug.description }}</p>
        </section>
      </div>
    </section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed } from 'vue';
import Pop from "../utils/Pop.js";
import { Bug } from "../models/Bug.js";
import { bugsService } from "../services/BugsService.js";

export default {
  props: { bug: { type: Bug, required: true } },

  setup() {

    return {
      account: computed(() => AppState.account),

      day(date) {
        const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const day = week[date.getDay()];
        return day.slice(0, 3);
      },

      async closeBug(bugObj) {
        try {
          const yes = await Pop.confirm('Squash this bug?');
          if (!yes) { return }
          await bugsService.closeBug(bugObj);
        }
        catch (error) { Pop.error(error); }
      }

    }
  }
};
</script>


<style lang="scss" scoped>
.courier {
  font-family: 'Courier New', Courier, monospace;
}

.highPriority {
  background-color: yellow !important;
}

.dot {
  height: 3rem;
  width: 3rem;
}

.open {
  background-color: orangered;
  opacity: .9;
}

.closed {
  background-color: greenyellow;
  opacity: .7;
}

.noClicky {
  pointer-events: none;
}
</style>
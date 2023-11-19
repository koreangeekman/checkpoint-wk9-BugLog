<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 p-0">
        <section class="heading d-flex align-items-end justify-content-between">
          <span class="d-flex align-items-end">
            <img :src="bug.creator.picture" :alt="bug.creator.name" class="border border-dark rounded">
            <span class="ms-3">
              <p class="mb-0 text-secondary">Reported by</p>
              <p class="mb-0 fw-bold fs-5">{{ bug.creator.email }}</p>
            </span>
          </span>
          <span class="mx-3">
            <p class="mb-0 text-secondary">Priority</p>
            <p class="mb-0 fw-bold fs-5">{{ bug.priority }}</p>
          </span>
          <span class="mx-3">
            <p class="mb-0 text-secondary">Last Updated</p>
            <p class="mb-0 fw-bold fs-5 courier">{{ day(bug.updatedAt) + ' ' + bug.updatedAt.toLocaleDateString() }}</p>
          </span>
          <span v-if="!bug.closed" class="mx-3 d-flex align-items-center rounded-pill border border-dark">
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
import { Bug } from "../models/Bug.js";

export default {
  props: { bug: { type: Bug } },

  setup() {

    return {
      account: computed(() => AppState.account),

      day(date) {
        const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const day = week[date.getDay()];
        return day.slice(0, 3);
      },

    }
  }
};
</script>


<style lang="scss" scoped>
.courier {
  font-family: 'Courier New', Courier, monospace;
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
</style>
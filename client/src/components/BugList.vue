<template>
  <td class="p-2" :title="bug.description">{{ bug.title }}</td>
  <td class="courier text-center">{{ bug.priority }}</td>
  <td class="courier" :title="bug.creator.name">{{ bug.creator.email }} </td>
  <td class="courier">
    <p class="mb-0 mx-3 text-nowrap">{{ day(bug.updatedAt) + ' ' + bug.updatedAt.toLocaleDateString() }}</p>
  </td>
  <td class="d-flex align-items-center justify-content-end p-2"
    :title="bug.closed ? 'Closed on ' + bug.closedDate.toLocaleDateString() + ' @ ' + bug.closedDate.toLocaleTimeString() : ''">
    <p class=" mb-0 me-2">{{ bug.closed ? 'Closed' : 'Open' }}</p>
    <div class="dot rounded-circle border border-dark" :class="bug.closed ? 'closed' : 'open'"></div>
  </td>
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

.priority {
  background-color: wheat;
}

.dot {
  height: 2rem;
  width: 2rem;
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
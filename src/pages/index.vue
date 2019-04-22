<template>
  <div class="container">
    <Header class="header" />
    <a class="btn" @click="displayPreviousEvent">&lt;</a>
    <EventCard class="event" :event="events[index]" />
    <a class="btn" @click="displayNextEvent">&gt;</a>
    <TimeLine class="time-line" :index="index" :eventsLength="events.length" />
    <GlobalEvents
      @keyup.left="displayPreviousEvent"
      @keyup.right="displayNextEvent"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import GlobalEvents from 'vue-global-events'

import EventCard from '~/components/EventCard.vue'
import TimeLine from '~/components/TimeLine.vue'
import Header from '~/components/Header.vue'
import { Event } from '~/types'

@Component({
  components: {
    EventCard,
    GlobalEvents,
    Header,
    TimeLine
  },
  async asyncData({ store }) {
    await store.dispatch('fetchEvents')
  }
})
export default class Index extends Vue {
  index: number = 0

  get events(): Event[] {
    return this.$store.getters.events
  }

  displayNextEvent() {
    if (this.events.length - 1 > this.index) {
      this.index++
    }
  }

  displayPreviousEvent() {
    if (this.index > 0) {
      this.index--
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  align-items: center;
  background-color: #485260;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}

.header {
  position: absolute;
  top: 0;
}

.time-line {
  position: absolute;
  bottom: 0;
}

.btn {
  color: #fff;
  cursor: pointer;
  font-size: 2rem;
  font-weight: bold;
  margin: 4vw;
}
</style>

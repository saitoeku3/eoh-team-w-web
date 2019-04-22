<template>
  <div class="container">
    <Header class="header" />
    <EventCard class="event" :event="events[1]" />
    <button @click="displayPreviousEvent">&lt;</button>
    <button @click="displayNextEvent">&gt;</button>
    <TimeLine class="time-line" :index="index" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EventCard from '~/components/EventCard.vue'
import TimeLine from '~/components/TimeLine.vue'
import Header from '~/components/Header.vue'
import { Event } from '~/types'

@Component({
  components: {
    EventCard,
    Header,
    TimeLine
  },
  async asyncData({ store }) {
    await store.dispatch('fetchEvents')
  }
})
export default class Index extends Vue {
  index: number = 0

  displayNextEvent() {
    this.index++
  }

  displayPreviousEvent() {
    this.index--
  }

  get events(): Event[] {
    return this.$store.getters.events
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
</style>

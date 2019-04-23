<template>
  <div class="container">
    <Header class="header" />
    <a class="btn" @click="displayPreviousEvent">&lt;</a>
    <EventCard class="event" :event="events[index]" />
    <a class="btn" @click="displayNextEvent">&gt;</a>
    <TimeLine
      class="time-line"
      :toggleIsPlaying="
        () => {
          isPlaying = !isPlaying
        }
      "
      :index="index"
      :eventsLength="events.length"
      :isPlaying="isPlaying"
    />
    <GlobalEvents
      @keyup.left="displayPreviousEvent"
      @keyup.right="displayNextEvent"
      @keyup.enter="isPlaying = !isPlaying"
    />
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
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
  isPlaying: boolean = false
  intervalState: any

  get events(): Event[] {
    return this.$store.getters.events
  }

  get isFinished() {
    return this.events.length - 1 == this.index
  }

  displayNextEvent() {
    if (!this.isFinished) {
      this.index++
    }
  }

  displayPreviousEvent() {
    if (this.index > 0) {
      this.index--
    }
  }

  @Watch('isPlaying')
  playEvents() {
    if (this.isPlaying) {
      this.intervalState = setInterval(this.displayNextEvent, 2000)
    } else {
      clearInterval(this.intervalState)
    }
  }

  @Watch('isFinished')
  finishPlayEvents() {
    if (this.isFinished) {
      this.isPlaying = false
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

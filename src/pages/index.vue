<template>
  <div class="container">
    <Header class="header" />
    <EventCard
      v-for="event in events"
      v-show="deisplayedEvents(event)"
      :class="eventClass(event)"
      :event="event"
      :index="index"
      :key="event.wareki"
    />
    <TimeLine class="time-line" :index="index" :wareki="events[index].wareki" />
    <GlobalEvents
      @keyup.enter="isPlaying = !isPlaying"
      @keyup.left="displayPreviousEvent"
      @keyup.right="displayNextEvent"
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

const DISPLAY_INTERVAL_TIME = 3000

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

  eventClass(event: Event) {
    switch (event) {
      case this.events[this.index - 1]:
        return 'event is-left'
      case this.events[this.index]:
        return 'event'
      case this.events[this.index + 1]:
        return 'event is-right'
      default:
        return
    }
  }

  deisplayedEvents(event: Event) {
    return (
      event === this.events[this.index - 1] ||
      event === this.events[this.index] ||
      event === this.events[this.index + 1]
    )
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
      this.intervalState = setInterval(
        this.displayNextEvent,
        DISPLAY_INTERVAL_TIME
      )
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
  background-color: #f3d8d8;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}

.event {
  position: absolute;

  &.is-left {
    right: 80vw;
  }

  &.is-right {
    left: 80vw;
  }
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

@media screen and (max-width: 411px) {
  .event {
    &.is-left {
      display: none;
    }

    &.is-right {
      display: none;
    }
  }
}
</style>

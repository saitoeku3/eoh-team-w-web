<template>
  <div class="container">
    <Header class="header" />
    <EventImg
      v-for="event in events"
      v-show="deisplayedEvents(event)"
      :class="eventClass(event)"
      :event="event"
      :key="event.wareki"
    />
    <StampComp
      style="z-index: 5;"
      v-for="stamp in stamps"
      :key="stamp.id"
      :stamp="stamp"
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
import EventImg from '~/components/EventImg.vue'
import Header from '~/components/Header.vue'
import StampComp from '~/components/Stamp.vue'
import TimeLine from '~/components/TimeLine.vue'
import firebase from '~/plugins/firebase'
import { Event, Stamp } from '~/types'

const DISPLAY_INTERVAL_TIME = 3000

@Component({
  components: {
    EventImg,
    GlobalEvents,
    Header,
    StampComp,
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
  stamps: Stamp[] = []

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

  created() {
    firebase
      .firestore()
      .collection('stamps')
      .onSnapshot(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          const id = doc.id
          const { content, has_displayed } = doc.data()
          const stamp: Stamp = {
            content,
            hasDisplayed: has_displayed,
            id
          }
          const isIncludes = this.stamps.some(s => s.id === id)
          if (!isIncludes && stamp.hasDisplayed === false) {
            this.stamps.push(stamp)
          }
        })
      })
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
  background-color: #fff;
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

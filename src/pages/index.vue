<template>
  <div class="container">
    <Header class="header" />
    <ActionBtn
      v-show="!isPlaying && !isFinished"
      :handleClick="togglePlayingEvent"
      ><span style="margin: 7px 0 0 4px;">▶</span>
    </ActionBtn>
    <ActionBtn v-show="!isPlaying && isFinished" :handleClick="replayEvents">
      <span style="margin-top: 4px;">↺</span>
    </ActionBtn>
    <transition-group class="list" name="flip">
      <li
        is="EventImg"
        v-for="event in events"
        v-show="deisplayedEvents(event) && isPlaying"
        :class="eventClass(event)"
        :event="event"
        :index="index"
        :key="event.wareki"
      />
    </transition-group>
    <StampComp
      style="z-index: 5;"
      v-for="stamp in stamps"
      :key="stamp.id"
      :stamp="stamp"
    />
    <TimeLine class="time-line" :index="index" :wareki="events[index].wareki" />
    <GlobalEvents
      @keyup.enter="isFinished ? replayEvents() : togglePlayingEvent()"
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
import ActionBtn from '~/components/ActionBtn.vue'
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
    ActionBtn,
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
        return 'event is-hidden'
    }
  }

  deisplayedEvents(event: Event) {
    return (
      event === this.events[this.index - 1] ||
      event === this.events[this.index] ||
      event === this.events[this.index + 1]
    )
  }

  togglePlayingEvent() {
    this.isPlaying = !this.isPlaying
  }

  replayEvents() {
    this.index = 0
    this.isPlaying = true
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

.list {
  position: absolute;
  display: flex;
  top: 0vh;
  left: 0vw;
}

.event {
  position: absolute;
  top: 10vh;
  left: 25vw;

  &.is-left {
    left: -30vw;
  }

  &.is-right {
    left: 80vw;
  }

  &.is-hidden {
    opacity: 0;
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

.flip {
  // 要素が移動するときのアニメーション設定（基本的にはtransitionにtransformを設定していればいい）
  &-move {
    transition: transform 1s;
  }

  // 要素が入るときのアニメーション
  &-enter {
    opacity: 0;
    transform: translate3d(-2000px, -10vh, 0);

    // アニメーションの初期設定（初期値とtransitionを設定する）
    &-active {
      opacity: 0;
      transition: opacity 1s, transform 0.5s;
    }
    // アニメーション開始（目標のプロパティ値を設定する）
    &-to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  // 要素が消える時のアニメーション
  &-leave {
    // アニメーションの初期設定
    &-active {
      // 要素が消える場合はabsoluteにする（重要！）
      position: absolute;
      transition: opacity 1s, transform 0.5s;
      transform: translate3d(0, 0, 0);
    }
    // アニメーション開始
    &-to {
      opacity: 0;
      transform: translate3d(-1000px, 0, 0);
    }
  }
}
</style>

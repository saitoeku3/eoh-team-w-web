<template>
  <div class="wrapper">
    <div class="event-title">
      <div>H.{{ event.wareki }}</div>
      <div>{{ event.name }}</div>
    </div>
    <img class="event-img" :src="event.imageUrl" alt="event image" />
    <p class="event-desc">{{ event.desc }}</p>
    <svg class="progress-bar" :width="lineWidth" height="5">
      <line
        x1="0"
        y1="3"
        :x2="lineWidth"
        y2="3"
        stroke="#282e3855"
        stroke-width="5"
      ></line>
      <line
        x1="0"
        y1="4"
        :x2="(lineWidth / (eventsLength - 1)) * index"
        y2="4"
        stroke="#485260"
        stroke-width="5"
      ></line>
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import TimeLine from '~/components/TimeLine.vue'
import { Event } from '~/types'

@Component({
  name: 'Event',
  components: {
    TimeLine
  }
})
export default class EventCard extends Vue {
  @Prop(Event) event!: Event
  @Prop(Number) eventsLength!: number
  @Prop(Number) index!: number

  width: number = window.innerWidth

  get lineWidth() {
    return this.width > 411 ? this.width * 0.5 : this.width * 0.7
  }

  handleResize() {
    this.width = window.innerWidth
  }

  created() {
    window.addEventListener('resize', this.handleResize)
  }

  destroy() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 0 16px #282e3855;
  box-shadow: 0 0 16px #282e38;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 70vh;
  width: 50vw;
}

.event-img {
  margin: 0 auto;
  width: 35vw;
}

.event-title {
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem;
}

.progress-bar {
  margin-top: auto;
  border-radius: 0 0 4px 4px;
}

@media screen and (max-width: 411px) {
  .wrapper {
    width: 70vw;
  }
}
</style>

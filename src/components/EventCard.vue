<template>
  <transition>
    <div class="wrapper">
      <div class="event-title">
        <div>平成{{ event.wareki === 1 ? '元' : event.wareki }}年</div>
        <div>{{ event.name }}</div>
      </div>
      <img
        v-show="event.imageUrl"
        class="event-img"
        :src="event.imageUrl"
        alt="event"
      />
      <p class="event-desc">{{ event.desc }}</p>
    </div>
  </transition>
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
  @Prop(Number) index!: number

  width: number = window.innerWidth

  get lineWidth() {
    return this.width > 411 ? this.width * 0.5 : this.width * 0.88
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
.v-enter-active {
  transition: opacity 0.2s;
  transition: transform 0.5s;
}

.v-enter {
  opacity: 0;
  transform: scale(0.7);
}

.wrapper {
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 0 16px #00000023;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 72vh;
  width: 50vw;
}

.event-img {
  margin: 0 auto;
  width: 24vw;
}

.event-desc {
  font-size: 1.5rem;
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
    width: 88vw;
  }

  .event-img {
    margin: 0 auto;
    width: 32vh;
  }
}
</style>

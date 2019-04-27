<template>
  <transition>
    <div>
      <div class="event-year">H{{ event.wareki }}</div>
      <img
        v-show="event.imageUrl"
        class="event-img"
        :src="event.imageUrl"
        alt="event"
      />
      <div class="event-name">{{ event.name }}</div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import TimeLine from '~/components/TimeLine.vue'
import { Event } from '~/types'

@Component({
  name: 'EventCard',
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
  transform: scale(0.9);
}

.event-year {
  color: #f36464;
  font-size: 3rem;
  font-weight: bold;
  margin: 1vh 0 1.5vh 0;
  text-align: center;
}

.event-img {
  border-radius: 6px;
  box-shadow: 0 0 16px #00000040;
  display: flex;
  flex-direction: column;
  filter: brightness(0.7);
  object-fit: cover;
  text-align: center;
  height: 70vh;
  width: 50vw;
  z-index: 0;
}

.event-name {
  color: #ffffff;
  font-size: 3.5rem;
  font-weight: 450;
  left: 6vw;
  margin: 0;
  position: relative;
  top: -60vh;
}

@media screen and (max-width: 411px) {
  .event-img {
    margin: 0 auto;
    width: 88vw;
  }

  .event-name {
    font-size: 3rem;
  }
}
</style>

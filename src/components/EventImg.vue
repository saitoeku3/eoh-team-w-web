<template>
  <div>
    <div class="event-year">H{{ event.wareki }}</div>
    <img
      class="event-img"
      v-show="event.imageUrl"
      :src="event.imageUrl"
      alt="event"
    />
    <div class="event-name">{{ event.name }}</div>
    <div class="event-desc">{{ event.desc }}</div>
  </div>
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
export default class EventImg extends Vue {
  @Prop() event!: Event

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
.event-year {
  color: #f36464;
  font-size: 3rem;
  font-weight: bold;
  margin: 0.5vh 0 3vh 0;
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
  height: 65vh;
  width: 50vw;
  z-index: 0;
}

.event-name {
  color: #ffffff;
  font-size: 3.5rem;
  font-weight: 450;
  left: 6vw;
  line-height: 3.5rem;
  margin: 0;
  position: relative;
  top: -60vh;
  width: 38vw;
  z-index: 1;
}

.event-desc {
  color: #ffffff;
  font-size: 2.5rem;
  left: 6vw;
  line-height: 3.5rem;
  margin: 0;
  position: relative;
  top: -50vh;
  width: 38vw;
  z-index: 1;
}

@media screen and (max-width: 411px) {
  .event-img {
    margin: 0 auto;
    width: 88vw;
  }

  .event-name {
    font-size: 3rem;
    width: 76vw;
  }

  .event-desc {
    width: 77vw;
  }
}
</style>

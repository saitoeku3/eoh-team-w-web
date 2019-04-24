<template>
  <div class="wrapper">
    <div class="event-title">
      <div>H.{{ event.wareki }}</div>
      <div>{{ event.name }}</div>
    </div>
    <img class="event-img" :src="event.imageUrl" alt="event image" />
    <p class="event-desc">{{ event.desc }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Event } from '~/types'

@Component({
  name: 'Event'
})
export default class EventCard extends Vue {
  @Prop(Event) event!: Event
}
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 0 16px #282e38;
  padding: 16px;
  text-align: center;
  height: 70vh;
  width: 50vw;
}

.event-img {
  height: 15vw;
}

.event-title {
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem;
}

@media screen and (max-width: 411px) {
  .wrapper {
    width: 70vw;
  }
}
</style>

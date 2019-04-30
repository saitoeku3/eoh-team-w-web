<template>
  <transition>
    <div
      class="wrapper"
      :style="{
        left: `${positionX}vw`,
        top: `${positionY}vh`
      }"
      v-show="isDisplayed"
    >
      {{ stamp.content }}
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import firebase from '~/plugins/firebase'
import { Stamp } from '~/types'

const DIAPLAY_TIME = 2000

@Component({
  name: 'StampComp'
})
export default class StampComp extends Vue {
  @Prop() stamp!: Stamp
  isDisplayed: boolean = false
  positionX: number = 0
  positionY: number = 0

  calcPosition() {
    if (Math.random() > 0.5) {
      this.positionY = Math.random() * 10
    } else {
      this.positionY = 80
    }
    do {
      this.positionX = Math.random() * 85
    } while (this.positionX < 82 && 84 < this.positionX)
  }

  created() {
    this.calcPosition()
    setTimeout(() => {
      this.isDisplayed = true
    }, 1)
    setTimeout(() => {
      this.isDisplayed = false
      firebase
        .firestore()
        .collection('stamps')
        .doc(this.stamp.id)
        .update({ has_displayed: true })
    }, DIAPLAY_TIME)
  }
}
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.75s;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}

.wrapper {
  font-size: 8rem;
  margin: 8px;
  z-index: 5;
  position: absolute;
}
</style>

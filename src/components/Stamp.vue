<template>
  <transition>
    <div class="wrapper" v-show="isDisplayed">
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
  @Prop(Stamp) stamp!: Stamp
  isDisplayed: boolean = false

  created() {
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
  font-size: 5rem;
  margin: 8px;
}
</style>

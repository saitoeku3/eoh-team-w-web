<template>
  <a class="play-btn" @click="handleClick">
    <span style="margin: 7px 0 0 4px;">▶</span>
  </a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import firebase from '~/plugins/firebase'
import { Stamp } from '~/types'

const DIAPLAY_TIME = 2000

@Component({
  name: 'PlayBtn'
})
export default class StampComp extends Vue {
  @Prop(Function) handleClick!: () => void
}
</script>

<style lang="scss" scoped>
.play-btn {
  background-color: #f36464;
  border-radius: 50%;
  box-shadow: 0 3px 8px #00000049;
  color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  font-size: 5vh;
  height: 8vh;
  text-align: center;
  width: 8vh;
}
</style>

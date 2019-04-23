<template>
  <DarkBar class="wrapper">
    <a class="btn" @click="toggleIsPlaying">{{ isPlaying ? 'STOP' : 'PLAY' }}</a>
    <svg :width="lineWidth" height="40">
      <line
        x1="0"
        y1="24"
        :x2="lineWidth"
        y2="24"
        stroke="#485260"
        stroke-width="4"
      ></line>
      <line
        x1="0"
        y1="24"
        :x2="progressLineWidth"
        y2="24"
        stroke="#fff"
        stroke-width="4"
      ></line>
    </svg>
  </DarkBar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import DarkBar from '~/components/DarkBar.vue'

@Component({
  name: 'TimeLine',
  components: {
    DarkBar
  }
})
export default class TimeLine extends Vue {
  @Prop(Number) index!: number
  @Prop(Number) eventsLength!: number
  @Prop(Boolean) isPlaying!: boolean
  @Prop(Function) toggleIsPlaying!: () => void

  width: number = window.innerWidth

  get lineWidth() {
    return this.width * 0.5
  }

  get progressLineWidth() {
    return (this.lineWidth / (this.eventsLength - 1)) * this.index
  }

  handleWidthChange() {
    this.width = window.innerWidth
  }

  created() {
    window.addEventListener('resize', this.handleWidthChange)
  }

  destroy() {
    window.removeEventListener('resize', this.handleWidthChange)
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  color: aliceblue;
  display: flex;
  justify-content: center;
  text-align: center;
}

.btn {
  cursor: pointer;
  margin: auto 8px;
}
</style>

<template>
  <DarkBar class="wrapper">
    <a class="btn" @click="toggleIsPlaying">{{
      isPlaying ? 'STOP' : 'PLAY'
    }}</a>
    <svg :width="lineWidth" :height="lineHeight">
      <line
        x1="0"
        :y1="lineHeight"
        :x2="lineWidth"
        :y2="lineHeight"
        stroke="#485260"
        stroke-width="5"
      ></line>
      <line
        x1="0"
        :y1="lineHeight"
        :x2="progressLineWidth"
        :y2="lineHeight"
        stroke="#fff"
        stroke-width="5"
      ></line>
    </svg>
    <div class="index">{{ index + 1 }}/{{ eventsLength }}</div>
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
  height: number = window.innerHeight

  get lineWidth() {
    return this.width * 0.5
  }

  get lineHeight() {
    return this.height * 0.03
  }

  get progressLineWidth() {
    return (this.lineWidth / (this.eventsLength - 1)) * this.index
  }

  handleResize() {
    this.width = window.innerWidth
    this.height = window.innerHeight
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
  color: aliceblue;
  display: flex;
  justify-content: center;
  text-align: center;
}

.btn {
  cursor: pointer;
  margin: auto 8px;
}

.index {
  margin: auto 8px;
}
</style>

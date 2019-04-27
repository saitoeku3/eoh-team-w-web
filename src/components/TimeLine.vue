<template>
  <div>
    <Balloon class="balloon" :style="balloonPosition">
      {{ wareki === 1 ? '元' : wareki }}
    </Balloon>
    <NavBar class="wrapper">
      <div class="year">元年</div>
      <svg :width="lineWidth" :height="lineHeight">
        <line
          x1="0"
          :y1="lineHeight"
          :x2="lineWidth"
          :y2="lineHeight"
          stroke="#fff"
          stroke-width="5"
        ></line>
      </svg>
      <div class="year">31年</div>
    </NavBar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Balloon from '~/components/Balloon.vue'
import NavBar from '~/components/NavBar.vue'

@Component({
  name: 'TimeLine',
  components: {
    Balloon,
    NavBar
  }
})
export default class TimeLine extends Vue {
  @Prop(Number) index!: number
  @Prop(Number) wareki!: number

  width: number = window.innerWidth
  height: number = window.innerHeight

  get lineWidth() {
    return this.width * 0.5
  }

  get lineHeight() {
    return this.height * 0.03
  }

  get balloonPosition() {
    return {
      '--balloon-position': `${(this.lineWidth / 30) * this.wareki}px`
    }
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

.year {
  font-size: 1.25rem;
  margin: auto 8px;
}

.balloon {
  bottom: 2vh;
  color: #282e38;
  left: calc(22vw + var(--balloon-position));
  position: absolute;
}

@media screen and (max-width: 411px) {
  .balloon {
    left: calc(16.8vw + var(--balloon-position));
  }
}
</style>

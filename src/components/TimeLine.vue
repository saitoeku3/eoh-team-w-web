<template>
  <DarkBar class="wrapper">
    <svg width="900" height="100">
      <line
        x1="0"
        y1="24"
        x2="900"
        y2="24"
        stroke="white"
        stroke-width="4"
      ></line>
      <line
        x1="0"
        y1="24"
        :x2="index * 100"
        y2="24"
        stroke="#485260"
        stroke-width="5"
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
}
</script>

<style lang="scss" scoped>
.wrapper {
  text-align: center;
}
</style>

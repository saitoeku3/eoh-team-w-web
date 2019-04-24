<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'DarkBar'
})
export default class DarkBar extends Vue {}
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: #282e38;
  height: 5vh;
  width: 100vw;
}
</style>

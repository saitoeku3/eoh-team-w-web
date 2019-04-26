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
  background-color: #f36464;
  height: 6vh;
  width: 100vw;
}
</style>

<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Balloon'
})
export default class Balloon extends Vue {}
</script>

<style lang="scss" scoped>
.wrapper {
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 16px #00000025;
  box-sizing: border-box;
  color: #485260;
  display: inline-block;
  font-size: 1rem;
  font-weight: bold;
  height: 3rem;
  line-height: 3rem;
  margin: 1.5em 0;
  padding: 0 5px;
  position: relative;
  text-align: center;
  width: 3rem;

  &:before {
    border: 15px solid transparent;
    border-top: 15px solid #fff;
    bottom: -25px;
    content: '';
    left: 50%;
    margin-left: -15px;
    position: absolute;
    z-index: 0;
  }
}

@media screen and (max-width: 320px) {
  .wrapper {
    height: 2.4rem;
    line-height: 2.4rem;
    width: 2.4rem;
  }
}
</style>

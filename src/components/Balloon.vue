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
  position: relative;
  display: inline-block;
  margin: 1.5em 0;
  padding: 0 5px;
  width: 3rem;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  color: #485260;
  font-size: 1rem;
  font-weight: bold;
  background: #fff;
  border-radius: 50%;
  box-sizing: border-box;

  &:before {
    content: '';
    position: absolute;
    bottom: -25px;
    left: 50%;
    margin-left: -15px;
    border: 15px solid transparent;
    border-top: 15px solid #fff;
    z-index: 0;
  }
}

@media screen and (max-width: 320px) {
  .wrapper {
    width: 2.4rem;
    height: 2.4rem;
    line-height: 2.4rem;
  }
}
</style>

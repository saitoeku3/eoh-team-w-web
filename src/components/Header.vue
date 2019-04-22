<template>
  <DarkBar class="wrapper">
    <div class="title">Title</div>
  </DarkBar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DarkBar from '~/components/DarkBar.vue'

@Component({
  name: 'Header',
  components: {
    DarkBar
  }
})
export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
.wrapper {
  color: #fff;
  display: flex;
}

.title {
  font-size: 1.25rem;
  font-weight: 500;
  margin: auto;
  text-align: center;
}
</style>

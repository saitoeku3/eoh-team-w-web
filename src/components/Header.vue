<template>
  <NavBar class="wrapper">
    <div class="title">平成最後のハッカソン</div>
  </NavBar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import NavBar from '~/components/NavBar.vue'

@Component({
  name: 'Header',
  components: {
    NavBar
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
  font-size: 1.5rem;
  margin: auto;
  text-align: center;
}
</style>

<template>
  <div class="wrapper">
    <ul>
      <li v-for="event in events" >
        {{event}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

@Component({
  async asyncData({ store }) {
    await store.dispatch('fetchEvents')
  },
  computed: {
    ...mapGetters(['events'])
  }
})
export default class index extends Vue {}
</script>

<style lang="scss">
  .wrapper {
    height: 100vh;
    width: 100vw;
  }
</style>

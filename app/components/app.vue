<template>
  <div id="app">
    <nav-component></nav-component>
    <router-view></router-view>
  </div>
</template>

<script>
import Nav from './nav.vue';

export default {
  data() {
    return {
      message: 'balls'
    }
  },
  components: {
    'nav-component': Nav
  }
};
</script>

<template lang="pug">
  main#content
    filter-bar-component(v-on:filter="updateFilters", v-on:compare="updateShowComparison")
    div.waterfall-container
      div.waterfall-container-1
        <waterfall-component-1 v-bind:filters="filters" v-bind:display="display" v-bind:settings="settings" url="urls[0]"></waterfall-component-1>
      div.waterfall-container-2(v-if="showComparison")
        <waterfall-component-2 v-bind:filters="filters" v-bind:display="display" v-bind:settings="settings" url="urls[1]"></waterfall-component-2>
</template>

<script>
import Vue from 'vue';

import WaterfallFilterBar from './waterfall_filter_bar';
import Waterfall from './waterfall.vue';

export default {
  data: function() {
    return {
      display: 'detailed',
      showComparison: false,
      filters: {
        url: '',
        type: 'all'
      },
      settings: {
        isRegex: false,
        method: 'filter'
      },
      waterfallDisplay: 'simple',
      urls: [
        'https://www.webpagetest.org/export.php?test=170524_2E_1B3Q&run=2&cached=0&bodies=1&pretty=1',
        'https://www.webpagetest.org/export.php?test=170524_2E_1B3Q&run=3&cached=0&bodies=1&pretty=1'
      ]
    };
  },
  methods: {
    updateFilters(filters, settings) {
      this.filters = filters;
      this.settings = settings;
    },
    updateShowComparison(value) {
      this.showComparison = value;
      this.display = (this.showComparison) ? 'simple' : 'detailed';
    }
  },
  components: {
    'waterfall-component-1': Waterfall,
    'waterfall-component-2': Waterfall,
    filterBarComponent: WaterfallFilterBar
  }
};
</script>

<style lang="scss">
</style>

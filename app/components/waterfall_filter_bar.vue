<template lang="pug">
  div.filter-bar.container-fluid
    div.row
      div.col-lg-4
        div.input-group.waterfall-search
          input.form-control(type="text", v-model="filters.url", v-on:input="onInputUrlFilter($event.target.value)")
          span.input-group-addon
            i.fa.fa-times-circle(v-on:click="onInputUrlFilter('')", v-bind:class="{ invisible: !filters.url }")
      div.col-lg-2.form-inline
        div.checkbox
          label
            input(type="checkbox", v-model="settings.isRegex", v-on:click="triggerFilter()")
            | Regex
        div.radio
          label
            input(type="radio", value="filter", v-model="settings.method", v-on:click="triggerFilter()")
            | Filter
        label.radio-inline
          input(type="radio", value="highlight", v-model="settings.method", v-on:click="triggerFilter()")
          | Highlight
      div.col-lg-4
        div.btn-group(data-toggle="buttons")
          <label v-on:click="onClickTypeFilter('all')" class="btn btn-primary active">
            <input type="radio" name="options" id="option1" autocomplete="off" value="all">All
          </label>
          <label v-on:click="onClickTypeFilter('js')" class="btn btn-primary">
            <input type="radio" name="options" id="option2" autocomplete="off" value="js">JS
          </label>
          <label v-on:click="onClickTypeFilter('css')" class="btn btn-primary">
            <input type="radio" name="options" id="option3" autocomplete="off" value="css">CSS
          </label>
          <label v-on:click="onClickTypeFilter('img')" class="btn btn-primary">
            <input type="radio" name="options" id="option3" autocomplete="off" value="img">Img
          </label>
          <label v-on:click="onClickTypeFilter('media')" class="btn btn-primary">
            <input type="radio" name="options" id="option3" autocomplete="off" value="media">Media
          </label>
          <label v-on:click="onClickTypeFilter('font')" class="btn btn-primary">
            <input type="radio" name="options" id="option3" autocomplete="off" value="font">Font
          </label>
          <label v-on:click="onClickTypeFilter('doc')" class="btn btn-primary">
            <input type="radio" name="options" id="option3" autocomplete="off" value="doc">Doc
          </label>
          <label v-on:click="onClickTypeFilter('other')" class="btn btn-primary">
            <input type="radio" name="options" id="option3" autocomplete="off" value="other">Other
          </label>
      div.col-lg-2
        button.btn.btn-default(v-on:click="toggleCompare") Compare
</template>

<script>
export default {
  data() {
    return {
      showComparison: false,
      settings: {
        isRegex: false,
        method: 'filter'
      },
      filters: {
        url: '',
        type: ''
      }
    };
  },
  methods: {
    onClickTypeFilter: function(value, event) {
      this.filters.type = value;
      this.$emit('filter', this.filters);
    },
    triggerFilter: function() {
      this.$emit('filter', this.filters, this.settings);
    },
    onInputUrlFilter: function(value, event) {
      this.filters.url = value;
      this.$emit('filter', this.filters);
    },
    toggleCompare: function() {
      this.showComparison = !this.showComparison;
      this.$emit('compare', this.showComparison)
    }
   }
};
</script>

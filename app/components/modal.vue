<template lang="pug">
  div.modal(tabindex="-1", role="dialog")
    div.modal-dialog(role="document")
      div.modal-content
        div.modal-header
          button.close(type="button", aria-label="Close", v-on:click="cancel()")
            span(aria-hidden="true") &times;
          h4.modal-title My Modal
        div.modal-body
          form
            input.form-control(name="test_url", placeholder="Test Results URL", v-bind="url")
        div.modal-footer
          button.btn.btn-default(type="button", v-on:click="cancel()") Cancel
          button.btn.btn-primary(type="button", v-on:click="save()") Load
</template>

<script>
export default {
  props: ['url'],
  methods: {
    cancel: function() {
      $(this.$el).modal('hide');
      this.$emit('cancel');
    },
    save: function() {
      $(this.$el).modal('hide');
      this.$emit('save', this.url);
    }
  },
  mounted: function() {
    $(this.$el).modal({})
      .on('hide.bs.modal', (event) => {
        this.$emit('cancel');
      });
  }
};
</script>

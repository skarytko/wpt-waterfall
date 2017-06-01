<template lang="pug">
  div.waterfall
    a(v-bind:href="getTestDetailsURL()", target="_blank") View in WPT
    button.btn.btn-primary(type="button", v-on:click="showModal = !showModal") Change Results
    modal-component(v-if="showModal", v-on:cancel="showModal = false", v-on:save="saveURL")
    table.table.table-striped.table-condensed.table-hover.table-waterfall
      thead
        tr
          th.count #
          th.secure
            i.fa.fa-lock
          th.host(v-if="display != 'simple'") Host
          th.file File
          th.status(v-if="display != 'simple'") Status
          th.type(v-if="display != 'simple'") Type
          th.size(v-if="display != 'simple'") Size
          th.timeline
            div.tick(v-for="tick in getTicks()", v-bind:style="tick.css")
            div.tick-label(v-for="tick in getTicks()", v-bind:style="tick.css") {{ tick.label }}
      tbody
        tr(
          v-for="(entry, index) in filter(items, filters.url, filters.type)",
          v-on:click="isActive = entry",
          v-bind:class="{active: isActive == entry}"
        )
          td.count {{ entry.id + '.' }}
          td.secure
            i.fa.fa-lock(v-if="isSecure(entry.request.url)")
          td.host(v-if="display != 'simple'")
            div {{ urlParse(entry.request.url).hostname }}
          td.file
            div {{ urlParse(entry.request.url).filename }}
          td.status(v-if="display != 'simple'") {{entry.response.status}}
          td.type(v-if="display != 'simple'") {{entry.response.content.mimeType}}
          td.size(v-if="display != 'simple'") {{fromBytes(entry.response.content.size)}}
          td.timeline
            div.ticks
              div.tick(v-for="tick in getTicks()", v-bind:style="tick.css")
            div.events
              div.event.start-render(v-bind:style="getEventCSS('startRender')")
              div.event.dom-interactive(v-bind:style="getEventCSS('domInteractive')")
              div.event.on-load(v-bind:style="getEventCSS('onLoad')")
              div.event.document-complete(v-bind:style="getEventCSS('documentComplete')")
            div.timings(
                v-bind:style="getTimingsOffset(entry.startedDateTime, entry.timings)",
                v-on:click="showTimings(entry.timings)"
              )
              div.timing.timing-blocked(v-if="entry.timings.blocked > -1", v-bind:style="getTimingOffset('blocked', entry.timings)")
              div.timing.timing-dns(v-if="entry.timings.dns > -1", v-bind:style="getTimingOffset('dns', entry.timings)")
              div.timing.timing-connect(v-if="entry.timings.connect > -1", v-bind:style="getTimingOffset('connect', entry.timings)")
              div.timing.timing-ssl(v-if="entry.timings.ssl > -1", v-bind:style="getTimingOffset('ssl', entry.timings)")
              div.timing.timing-send(v-if="entry.timings.send > -1", v-bind:style="getTimingOffset('send', entry.timings)")
              div.timing.timing-wait(
                v-if="entry.timings.wait > -1",
                v-bind:style="getTimingOffset('wait', entry.timings)"
              )
              div.timing.timing-receive(v-if="entry.timings.receive > -1", v-bind:style="getTimingOffset('receive', entry.timings)")
</template>

<script>
import axios from 'axios';
import math from 'mathjs';
import url from 'url';

import Modal from './modal.vue';

const filters = {
  url(value, text) {
    return value.indexOf(text) != -1;
  },
  type(value, type) {
    if (type === 'all' || !type) {
      return true;
    } else if (type === 'js' && value.search(/(javascript)/g) != -1) {
      return true;
    } else if (type === 'css' && value.search(/(css)/g) != -1) {
      return true;
    } else if (type === 'img' && value.search(/(image)/g) != -1) {
      return true;
    } else if (type === 'media' && value.search(/(media)/g) != -1) {
      return true;
    } else if (type === 'font' && value.search(/(font)/g) != -1) {
      return true;
    } else if (type === 'doc' && value.search(/(html)/g) != -1) {
      return true;
    } else if (type === 'other' && value.search(/(?!javascript|css|image|media|font|html)/g) != 1) {
      return
    } else {
      return false;
    }
  }
};

export default {
  components: {
    'modal-component': Modal
  },
  props: ['url', 'display', 'filters', 'settings'],
  data() {
    return {
      page: {},
      items: [],
      isActive: null,
      showModal: false,
    };
  },
  created() {
    axios.get(this.url)
      .then(resp => {
        this.page = resp.data.log.pages[0];

        resp.data.log.entries.forEach(function(entry, index) {
          entry.id = index + 1;
		    });

        this.items = resp.data.log.entries;
      })
      .catch(err => {
        this.errors.push(err);
      });
  },
  methods: {
    saveURL: function(url) {
      this.url = url;
      this.showModal = false;
    },
    filter: function(items, urlFilter, typeFilter) {
      return items.filter(function(item) {
        return filters.url(item.request.url, urlFilter)
          && filters.type(item.response.content.mimeType, typeFilter);
      });
    },
    onClickTypeFilter: function(value, event) {
      this.typeFilter = value;
    },
    fromBytes: function(bytes) {
      if (bytes >= 1000 && bytes < 1000 * 100) {
        return math.round(bytes / 1000, 1) + 'KB';
      } else if (bytes >= 1000 * 100 && bytes < 1000 * 100 * 100) {
        return math.round(bytes / (1000 * 100), 1) + 'MB';
      } else {
        return bytes + 'B';
      }
    },
    getTicks: function() {
      const fl = Math.abs(this.page._fullyLoaded);
      const tickInterval = (fl > 10000) ? Math.floor(fl / 10000) * 1000 : 500;
      const tickCount = Math.abs(fl / tickInterval);
      let ticks = [];

      for(let i=0; i<=tickCount; i++) {
        ticks.push({
          label: math.format(i * tickInterval / 1000, { notation: 'fixed', precision: 1}) + ' s',
          css: {
            left: (i * tickInterval * 100) / fl + '%'
          }
        });
      }

      return ticks;
    },
    getTimingsOffset: function(startedDateTime, timings) {
      let sum = 0;
      let realStartDateTime = new Date(startedDateTime).getTime() - timings.blocked - timings.dns - timings.connect;

      if (timings.blocked > -1) sum += timings.blocked;
      if (timings.dns > -1) sum += timings.dns;
      if (timings.connect > -1) sum += timings.connect;
      if (timings.send > -1) sum += timings.send;
      if (timings.wait > -1) sum += timings.wait;
      if (timings.receive > -1) sum += timings.receive;

      return {
        'width': sum / this.page._fullyLoaded * 100 + '%',
        'margin-left': (realStartDateTime - new Date(this.page.startedDateTime).getTime()) / this.page._fullyLoaded * 100 + '%'
      };
    },
    getTimingOffset: function(name = '', timings = {}) {
      let sum = 0;
      let value = 0;

      if (timings.blocked > -1) sum += timings.blocked;
      if (timings.dns > -1) sum += timings.dns;
      if (timings.connect > -1) sum += timings.connect;
      if (timings.send > -1) sum += timings.send;
      if (timings.wait > -1) sum += timings.wait;
      if (timings.receive > -1) sum += timings.receive;

      switch (name) {
        case 'connect':
          value = timings.connect - timings.ssl;
          break;
        default:
          value = timings[name];
      }

      return {
        'width': value / sum * 100 + '%'
      };
    },
    getEventCSS: function(name = '') {
      switch (name) {
        case 'startRender':
          return {
            'left': (this.page.pageTimings._startRender / this.page._fullyLoaded * 100) + '%'
          };
        case 'domInteractive':
          return {
            'left': (this.page._domInteractive / this.page._fullyLoaded * 100) + '%'
          };
        case 'onLoad':
          return {
            left: (this.page._loadEventStart / this.page._fullyLoaded * 100) + '%',
            width: ((this.page._loadEventEnd - this.page._loadEventStart) / this.page._fullyLoaded * 100) + '%'
          };
        case 'documentComplete':
          return {
            'left': (this.page.pageTimings.onLoad / this.page._fullyLoaded * 100) + '%'
          };
        default:
          return {};
      }
    },
    isSecure: function(url) {
      return url.substr(0, 5) === 'https';
    },
    urlParse: function(urlString) {
      const obj = url.parse(urlString);
      const regex = /([^\\\/]+)$/;
      const match = obj.pathname.match(regex);

      obj.filename = (match) ? match[0] : '';

      return obj;
    },
    showTimings: function(timings) {
      //console.log(timings);
    },
    getTestDetailsURL: function() {
      const obj = url.parse(this.url, true);

      return 'https://www.webpagetest.org/result/' + obj.query.test + '/' + obj.query.run + '/details/';
    }
  }
};
</script>

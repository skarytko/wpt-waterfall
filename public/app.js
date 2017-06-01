(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("components/app.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nav = require('./nav.vue');

var _nav2 = _interopRequireDefault(_nav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      message: 'balls'
    };
  },

  components: {
    'nav-component': _nav2.default
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('nav-component'),_vm._v(" "),_c('router-view')],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-beae2f38", __vue__options__)
  } else {
    hotAPI.reload("data-v-beae2f38", __vue__options__)
  }
})()}
});

;require.register("components/comparison.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _waterfall_filter_bar = require('./waterfall_filter_bar');

var _waterfall_filter_bar2 = _interopRequireDefault(_waterfall_filter_bar);

var _waterfall = require('./waterfall.vue');

var _waterfall2 = _interopRequireDefault(_waterfall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
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
      urls: ['https://www.webpagetest.org/export.php?test=170524_2E_1B3Q&run=2&cached=0&bodies=1&pretty=1', 'https://www.webpagetest.org/export.php?test=170524_2E_1B3Q&run=3&cached=0&bodies=1&pretty=1']
    };
  },
  methods: {
    updateFilters: function updateFilters(filters, settings) {
      this.filters = filters;
      this.settings = settings;
    },
    updateShowComparison: function updateShowComparison(value) {
      this.showComparison = value;
      this.display = this.showComparison ? 'simple' : 'detailed';
    }
  },
  components: {
    'waterfall-component-1': _waterfall2.default,
    'waterfall-component-2': _waterfall2.default,
    filterBarComponent: _waterfall_filter_bar2.default
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('main',{attrs:{"id":"content"}},[_c('filter-bar-component',{on:{"filter":_vm.updateFilters,"compare":_vm.updateShowComparison}}),_c('div',{staticClass:"waterfall-container"},[_c('div',{staticClass:"waterfall-container-1"},[_c('waterfall-component-1',{attrs:{"filters":_vm.filters,"display":_vm.display,"settings":_vm.settings,"url":"urls[0]"}})],1),(_vm.showComparison)?_c('div',{staticClass:"waterfall-container-2"},[_c('waterfall-component-2',{attrs:{"filters":_vm.filters,"display":_vm.display,"settings":_vm.settings,"url":"urls[1]"}})],1):_vm._e()])],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-108470d4", __vue__options__)
  } else {
    hotAPI.reload("data-v-108470d4", __vue__options__)
  }
})()}
});

;require.register("components/modal.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: ['url'],
  methods: {
    cancel: function cancel() {
      $(this.$el).modal('hide');
      this.$emit('cancel');
    },
    save: function save() {
      $(this.$el).modal('hide');
      this.$emit('save', this.url);
    }
  },
  mounted: function mounted() {
    var _this = this;

    $(this.$el).modal({}).on('hide.bs.modal', function (event) {
      _this.$emit('cancel');
    });
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal",attrs:{"tabindex":"-1","role":"dialog"}},[_c('div',{staticClass:"modal-dialog",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_c('div',{staticClass:"modal-header"},[_c('button',{staticClass:"close",attrs:{"type":"button","aria-label":"Close"},on:{"click":function($event){_vm.cancel()}}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])]),_c('h4',{staticClass:"modal-title"},[_vm._v("My Modal")])]),_c('div',{staticClass:"modal-body"},[_c('form',[_c('input',_vm._b({staticClass:"form-control",attrs:{"name":"test_url","placeholder":"Test Results URL"}},'input',_vm.url))])]),_c('div',{staticClass:"modal-footer"},[_c('button',{staticClass:"btn btn-default",attrs:{"type":"button"},on:{"click":function($event){_vm.cancel()}}},[_vm._v("Cancel")]),_c('button',{staticClass:"btn btn-primary",attrs:{"type":"button"},on:{"click":function($event){_vm.save()}}},[_vm._v("Load")])])])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fe1837a0", __vue__options__)
  } else {
    hotAPI.reload("data-v-fe1837a0", __vue__options__)
  }
})()}
});

;require.register("components/nav.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{staticClass:"navbar navbar-inverse navbar-fixed-top",attrs:{"id":"global-nav"}},[_c('div',{staticClass:"container-fluid"},[_c('div',{staticClass:"collapse navbar-collapse"},[_c('ul',{staticClass:"nav navbar-nav"},[_c('li',[_c('a',{attrs:{"href":"#/"}},[_vm._v("Home")])]),_c('li',[_c('a',{attrs:{"href":"#/comparison"}},[_vm._v("Comparison")])])])])])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3715c666", __vue__options__)
  } else {
    hotAPI.reload("data-v-3715c666", __vue__options__)
  }
})()}
});

;require.register("components/waterfall.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _mathjs = require('mathjs');

var _mathjs2 = _interopRequireDefault(_mathjs);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _modal = require('./modal.vue');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filters = {
  url: function url(value, text) {
    return value.indexOf(text) != -1;
  },
  type: function type(value, _type) {
    if (_type === 'all' || !_type) {
      return true;
    } else if (_type === 'js' && value.search(/(javascript)/g) != -1) {
      return true;
    } else if (_type === 'css' && value.search(/(css)/g) != -1) {
      return true;
    } else if (_type === 'img' && value.search(/(image)/g) != -1) {
      return true;
    } else if (_type === 'media' && value.search(/(media)/g) != -1) {
      return true;
    } else if (_type === 'font' && value.search(/(font)/g) != -1) {
      return true;
    } else if (_type === 'doc' && value.search(/(html)/g) != -1) {
      return true;
    } else if (_type === 'other' && value.search(/(?!javascript|css|image|media|font|html)/g) != 1) {
      return;
    } else {
      return false;
    }
  }
};

exports.default = {
  components: {
    'modal-component': _modal2.default
  },
  props: ['url', 'display', 'filters', 'settings'],
  data: function data() {
    return {
      page: {},
      items: [],
      isActive: null,
      showModal: false
    };
  },
  created: function created() {
    var _this = this;

    _axios2.default.get(this.url).then(function (resp) {
      _this.page = resp.data.log.pages[0];

      resp.data.log.entries.forEach(function (entry, index) {
        entry.id = index + 1;
      });

      _this.items = resp.data.log.entries;
    }).catch(function (err) {
      _this.errors.push(err);
    });
  },

  methods: {
    saveURL: function saveURL(url) {
      this.url = url;
      this.showModal = false;
    },
    filter: function filter(items, urlFilter, typeFilter) {
      return items.filter(function (item) {
        return filters.url(item.request.url, urlFilter) && filters.type(item.response.content.mimeType, typeFilter);
      });
    },
    onClickTypeFilter: function onClickTypeFilter(value, event) {
      this.typeFilter = value;
    },
    fromBytes: function fromBytes(bytes) {
      if (bytes >= 1000 && bytes < 1000 * 100) {
        return _mathjs2.default.round(bytes / 1000, 1) + 'KB';
      } else if (bytes >= 1000 * 100 && bytes < 1000 * 100 * 100) {
        return _mathjs2.default.round(bytes / (1000 * 100), 1) + 'MB';
      } else {
        return bytes + 'B';
      }
    },
    getTicks: function getTicks() {
      var fl = Math.abs(this.page._fullyLoaded);
      var tickInterval = fl > 10000 ? Math.floor(fl / 10000) * 1000 : 500;
      var tickCount = Math.abs(fl / tickInterval);
      var ticks = [];

      for (var i = 0; i <= tickCount; i++) {
        ticks.push({
          label: _mathjs2.default.format(i * tickInterval / 1000, { notation: 'fixed', precision: 1 }) + ' s',
          css: {
            left: i * tickInterval * 100 / fl + '%'
          }
        });
      }

      return ticks;
    },
    getTimingsOffset: function getTimingsOffset(startedDateTime, timings) {
      var sum = 0;
      var realStartDateTime = new Date(startedDateTime).getTime() - timings.blocked - timings.dns - timings.connect;

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
    getTimingOffset: function getTimingOffset() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var timings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var sum = 0;
      var value = 0;

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
    getEventCSS: function getEventCSS() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      switch (name) {
        case 'startRender':
          return {
            'left': this.page.pageTimings._startRender / this.page._fullyLoaded * 100 + '%'
          };
        case 'domInteractive':
          return {
            'left': this.page._domInteractive / this.page._fullyLoaded * 100 + '%'
          };
        case 'onLoad':
          return {
            left: this.page._loadEventStart / this.page._fullyLoaded * 100 + '%',
            width: (this.page._loadEventEnd - this.page._loadEventStart) / this.page._fullyLoaded * 100 + '%'
          };
        case 'documentComplete':
          return {
            'left': this.page.pageTimings.onLoad / this.page._fullyLoaded * 100 + '%'
          };
        default:
          return {};
      }
    },
    isSecure: function isSecure(url) {
      return url.substr(0, 5) === 'https';
    },
    urlParse: function urlParse(urlString) {
      var obj = _url2.default.parse(urlString);
      var regex = /([^\\\/]+)$/;
      var match = obj.pathname.match(regex);

      obj.filename = match ? match[0] : '';

      return obj;
    },
    showTimings: function showTimings(timings) {},
    getTestDetailsURL: function getTestDetailsURL() {
      var obj = _url2.default.parse(this.url, true);

      return 'https://www.webpagetest.org/result/' + obj.query.test + '/' + obj.query.run + '/details/';
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"waterfall"},[_c('a',{attrs:{"href":_vm.getTestDetailsURL(),"target":"_blank"}},[_vm._v("View in WPT")]),_c('button',{staticClass:"btn btn-primary",attrs:{"type":"button"},on:{"click":function($event){_vm.showModal = !_vm.showModal}}},[_vm._v("Change Results")]),(_vm.showModal)?_c('modal-component',{on:{"cancel":function($event){_vm.showModal = false},"save":_vm.saveURL}}):_vm._e(),_c('table',{staticClass:"table table-striped table-condensed table-hover table-waterfall"},[_c('thead',[_c('tr',[_c('th',{staticClass:"count"},[_vm._v("#")]),_vm._m(0),(_vm.display != 'simple')?_c('th',{staticClass:"host"},[_vm._v("Host")]):_vm._e(),_c('th',{staticClass:"file"},[_vm._v("File")]),(_vm.display != 'simple')?_c('th',{staticClass:"status"},[_vm._v("Status")]):_vm._e(),(_vm.display != 'simple')?_c('th',{staticClass:"type"},[_vm._v("Type")]):_vm._e(),(_vm.display != 'simple')?_c('th',{staticClass:"size"},[_vm._v("Size")]):_vm._e(),_c('th',{staticClass:"timeline"},[_vm._l((_vm.getTicks()),function(tick){return _c('div',{staticClass:"tick",style:(tick.css)})}),_vm._l((_vm.getTicks()),function(tick){return _c('div',{staticClass:"tick-label",style:(tick.css)},[_vm._v(_vm._s(tick.label))])})],2)])]),_c('tbody',_vm._l((_vm.filter(_vm.items, _vm.filters.url, _vm.filters.type)),function(entry,index){return _c('tr',{class:{active: _vm.isActive == entry},on:{"click":function($event){_vm.isActive = entry}}},[_c('td',{staticClass:"count"},[_vm._v(_vm._s(entry.id + '.'))]),_c('td',{staticClass:"secure"},[(_vm.isSecure(entry.request.url))?_c('i',{staticClass:"fa fa-lock"}):_vm._e()]),(_vm.display != 'simple')?_c('td',{staticClass:"host"},[_c('div',[_vm._v(_vm._s(_vm.urlParse(entry.request.url).hostname))])]):_vm._e(),_c('td',{staticClass:"file"},[_c('div',[_vm._v(_vm._s(_vm.urlParse(entry.request.url).filename))])]),(_vm.display != 'simple')?_c('td',{staticClass:"status"},[_vm._v(_vm._s(entry.response.status))]):_vm._e(),(_vm.display != 'simple')?_c('td',{staticClass:"type"},[_vm._v(_vm._s(entry.response.content.mimeType))]):_vm._e(),(_vm.display != 'simple')?_c('td',{staticClass:"size"},[_vm._v(_vm._s(_vm.fromBytes(entry.response.content.size)))]):_vm._e(),_c('td',{staticClass:"timeline"},[_c('div',{staticClass:"ticks"},_vm._l((_vm.getTicks()),function(tick){return _c('div',{staticClass:"tick",style:(tick.css)})})),_c('div',{staticClass:"events"},[_c('div',{staticClass:"event start-render",style:(_vm.getEventCSS('startRender'))}),_c('div',{staticClass:"event dom-interactive",style:(_vm.getEventCSS('domInteractive'))}),_c('div',{staticClass:"event on-load",style:(_vm.getEventCSS('onLoad'))}),_c('div',{staticClass:"event document-complete",style:(_vm.getEventCSS('documentComplete'))})]),_c('div',{staticClass:"timings",style:(_vm.getTimingsOffset(entry.startedDateTime, entry.timings)),on:{"click":function($event){_vm.showTimings(entry.timings)}}},[(entry.timings.blocked > -1)?_c('div',{staticClass:"timing timing-blocked",style:(_vm.getTimingOffset('blocked', entry.timings))}):_vm._e(),(entry.timings.dns > -1)?_c('div',{staticClass:"timing timing-dns",style:(_vm.getTimingOffset('dns', entry.timings))}):_vm._e(),(entry.timings.connect > -1)?_c('div',{staticClass:"timing timing-connect",style:(_vm.getTimingOffset('connect', entry.timings))}):_vm._e(),(entry.timings.ssl > -1)?_c('div',{staticClass:"timing timing-ssl",style:(_vm.getTimingOffset('ssl', entry.timings))}):_vm._e(),(entry.timings.send > -1)?_c('div',{staticClass:"timing timing-send",style:(_vm.getTimingOffset('send', entry.timings))}):_vm._e(),(entry.timings.wait > -1)?_c('div',{staticClass:"timing timing-wait",style:(_vm.getTimingOffset('wait', entry.timings))}):_vm._e(),(entry.timings.receive > -1)?_c('div',{staticClass:"timing timing-receive",style:(_vm.getTimingOffset('receive', entry.timings))}):_vm._e()])])])}))])],1)}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('th',{staticClass:"secure"},[_c('i',{staticClass:"fa fa-lock"})])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-30f5ba95", __vue__options__)
  } else {
    hotAPI.reload("data-v-30f5ba95", __vue__options__)
  }
})()}
});

;require.register("components/waterfall_filter_bar.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  data: function data() {
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
    onClickTypeFilter: function onClickTypeFilter(value, event) {
      this.filters.type = value;
      this.$emit('filter', this.filters);
    },
    triggerFilter: function triggerFilter() {
      this.$emit('filter', this.filters, this.settings);
    },
    onInputUrlFilter: function onInputUrlFilter(value, event) {
      this.filters.url = value;
      this.$emit('filter', this.filters);
    },
    toggleCompare: function toggleCompare() {
      this.showComparison = !this.showComparison;
      this.$emit('compare', this.showComparison);
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"filter-bar container-fluid"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-lg-4"},[_c('div',{staticClass:"input-group waterfall-search"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.filters.url),expression:"filters.url"}],staticClass:"form-control",attrs:{"type":"text"},domProps:{"value":(_vm.filters.url)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.filters.url=$event.target.value},function($event){_vm.onInputUrlFilter($event.target.value)}]}}),_c('span',{staticClass:"input-group-addon"},[_c('i',{staticClass:"fa fa-times-circle",class:{ invisible: !_vm.filters.url },on:{"click":function($event){_vm.onInputUrlFilter('')}}})])])]),_c('div',{staticClass:"col-lg-2 form-inline"},[_c('div',{staticClass:"checkbox"},[_c('label',[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.settings.isRegex),expression:"settings.isRegex"}],attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.settings.isRegex)?_vm._i(_vm.settings.isRegex,null)>-1:(_vm.settings.isRegex)},on:{"click":function($event){_vm.triggerFilter()},"__c":function($event){var $$a=_vm.settings.isRegex,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$c){$$i<0&&(_vm.settings.isRegex=$$a.concat($$v))}else{$$i>-1&&(_vm.settings.isRegex=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.settings.isRegex=$$c}}}}),_vm._v("Regex")])]),_c('div',{staticClass:"radio"},[_c('label',[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.settings.method),expression:"settings.method"}],attrs:{"type":"radio","value":"filter"},domProps:{"checked":_vm._q(_vm.settings.method,"filter")},on:{"click":function($event){_vm.triggerFilter()},"__c":function($event){_vm.settings.method="filter"}}}),_vm._v("Filter")])]),_c('label',{staticClass:"radio-inline"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.settings.method),expression:"settings.method"}],attrs:{"type":"radio","value":"highlight"},domProps:{"checked":_vm._q(_vm.settings.method,"highlight")},on:{"click":function($event){_vm.triggerFilter()},"__c":function($event){_vm.settings.method="highlight"}}}),_vm._v("Highlight")])]),_c('div',{staticClass:"col-lg-4"},[_c('div',{staticClass:"btn-group",attrs:{"data-toggle":"buttons"}},[_c('label',{staticClass:"btn btn-primary active",on:{"click":function($event){_vm.onClickTypeFilter('all')}}},[_c('input',{attrs:{"type":"radio","name":"options","id":"option1","autocomplete":"off","value":"all"}}),_vm._v("All\n")]),_vm._v(" "),_c('label',{staticClass:"btn btn-primary",on:{"click":function($event){_vm.onClickTypeFilter('js')}}},[_c('input',{attrs:{"type":"radio","name":"options","id":"option2","autocomplete":"off","value":"js"}}),_vm._v("JS\n")]),_vm._v(" "),_c('label',{staticClass:"btn btn-primary",on:{"click":function($event){_vm.onClickTypeFilter('css')}}},[_c('input',{attrs:{"type":"radio","name":"options","id":"option3","autocomplete":"off","value":"css"}}),_vm._v("CSS\n")]),_vm._v(" "),_c('label',{staticClass:"btn btn-primary",on:{"click":function($event){_vm.onClickTypeFilter('img')}}},[_c('input',{attrs:{"type":"radio","name":"options","id":"option3","autocomplete":"off","value":"img"}}),_vm._v("Img\n")]),_vm._v(" "),_c('label',{staticClass:"btn btn-primary",on:{"click":function($event){_vm.onClickTypeFilter('media')}}},[_c('input',{attrs:{"type":"radio","name":"options","id":"option3","autocomplete":"off","value":"media"}}),_vm._v("Media\n")]),_vm._v(" "),_c('label',{staticClass:"btn btn-primary",on:{"click":function($event){_vm.onClickTypeFilter('font')}}},[_c('input',{attrs:{"type":"radio","name":"options","id":"option3","autocomplete":"off","value":"font"}}),_vm._v("Font\n")]),_vm._v(" "),_c('label',{staticClass:"btn btn-primary",on:{"click":function($event){_vm.onClickTypeFilter('doc')}}},[_c('input',{attrs:{"type":"radio","name":"options","id":"option3","autocomplete":"off","value":"doc"}}),_vm._v("Doc\n")]),_vm._v(" "),_c('label',{staticClass:"btn btn-primary",on:{"click":function($event){_vm.onClickTypeFilter('other')}}},[_c('input',{attrs:{"type":"radio","name":"options","id":"option3","autocomplete":"off","value":"other"}}),_vm._v("Other\n")])])]),_c('div',{staticClass:"col-lg-2"},[_c('button',{staticClass:"btn btn-default",on:{"click":_vm.toggleCompare}},[_vm._v("Compare")])])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-14fadd66", __vue__options__)
  } else {
    hotAPI.reload("data-v-14fadd66", __vue__options__)
  }
})()}
});

;require.register("initialize.js", function(exports, require, module) {
'use strict';

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _mathjs = require('mathjs');

var _mathjs2 = _interopRequireDefault(_mathjs);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _app = require('./components/app.vue');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// extensions
_vue2.default.use(_vueRouter2.default);

// router
var router = new _vueRouter2.default({
  history: true,
  routes: _routes2.default
});

// initialize app
var app = new _vue2.default({
  router: router,
  render: function render(createElement) {
    return createElement(_app2.default);
  }
}).$mount('#app');

});

require.register("routes.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _comparison = require('./components/comparison.vue');

var _comparison2 = _interopRequireDefault(_comparison);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{ name: 'comparison', path: '/comparison', component: _comparison2.default }];

});

require.alias("process/browser.js", "process");
require.alias("punycode/punycode.js", "punycode");
require.alias("querystring-es3/index.js", "querystring");
require.alias("url/url.js", "url");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map
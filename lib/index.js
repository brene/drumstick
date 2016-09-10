'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodeInterval = require('node-interval');

var _nodeInterval2 = _interopRequireDefault(_nodeInterval);

var _fetch = require('fetch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var drum = function () {
  function drum() {
    _classCallCheck(this, drum);
  }

  _createClass(drum, [{
    key: 'start',
    value: function start(config) {
      var defaults = {
        endpoint: 'https://webtask.it.auth0.com/api/run/wt-renebrandel-outlook_com-0/hello?webtask_no_cache=1',
        payload: {
          message: 'hello from github.com/brene/drumstick'
        },
        debug: false,
        frequency: 1000
      };
      var newconfig = Object.assign({}, defaults, config);
      this.payload = newconfig.payload;
      this.endpoint = newconfig.endpoint;
      this.debug = newconfig.debug;
      this.interval = new _nodeInterval2.default(this.ping.bind(this), newconfig.frequency);
      this.interval.start();
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.interval.pause();
    }
  }, {
    key: 'resume',
    value: function resume() {
      this.interval.resume();
    }
  }, {
    key: 'changePayload',
    value: function changePayload(payload) {
      this.payload = payload;
    }
  }, {
    key: 'changeFrequency',
    value: function changeFrequency(frequency) {
      this.interval.stop();
      this.interval = new _nodeInterval2.default(this.ping.bind(this), frequency);
      this.interval.start();
    }
  }, {
    key: 'ping',
    value: function ping() {
      var _this = this;

      (0, _fetch.fetchUrl)(this.endpoint, {
        method: 'POST',
        payload: JSON.stringify(this.payload),
        headers: {
          'Content-Type': 'application/json'
        }
      }, function (error, body, meta) {
        if (error) {
          console.log('Request failed', error);
        } else {
          if (_this.debug) {
            console.log('Request succeeded with JSON response', body);
          }
        }
      });
    }
  }]);

  return drum;
}();

var drumstick = new drum();

exports.default = drumstick;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodeInterval = require('node-interval');

var _nodeInterval2 = _interopRequireDefault(_nodeInterval);

require('isomorphic-fetch');

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
        endpoint: 'http://localhost',
        payload: function payload() {},
        debug: false,
        frequency: 1000,
        method: 'POST'
      };
      var newconfig = Object.assign({}, defaults, config);
      this.payload = newconfig.payload;
      this.endpoint = newconfig.endpoint;
      this.debug = newconfig.debug;
      this.method = newconfig.method;
      this.interval = new _nodeInterval2.default(this.ping.bind(this), newconfig.frequency);
      this.ping();
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
      this.ping();
      this.interval.start();
    }
  }, {
    key: 'ping',
    value: function ping() {
      var _this = this;

      var body = typeof this.payload === 'function' ? this.payload() : this.payload;

      fetch(this.endpoint, {
        method: this.method,
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (data) {
        if (_this.debug) [console.log('Request succeeded with JSON response', data)];
      }).catch(function (error) {
        return console.log(error);
      });
    }
  }]);

  return drum;
}();

var drumstick = new drum();

exports.default = drumstick;
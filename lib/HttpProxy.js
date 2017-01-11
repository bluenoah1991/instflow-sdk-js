"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HttpProxy = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _httpPack = require('http-pack');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpProxy = exports.HttpProxy = function () {
    function HttpProxy() {
        _classCallCheck(this, HttpProxy);

        this.access_token = process.env.INSTFLOW_ACCESS_TOKEN;
        this.httpPack = new _httpPack.HttpPack({
            callback: this.callback,
            requestOpts: {
                url: process.env.INSTFLOW_URL || 'https://www.instflow.com/api/v1/activities',
                headers: {
                    'Access-Token': this.access_token
                }
            }
        });
    }

    _createClass(HttpProxy, [{
        key: 'commit',
        value: function commit(data) {
            var qos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            if (data != undefined) {
                this.httpPack.commit(Buffer.from(JSON.stringify(data)), qos);
            }
        }
    }]);

    return HttpProxy;
}();

exports.default = new HttpProxy();
//# sourceMappingURL=HttpProxy.js.map
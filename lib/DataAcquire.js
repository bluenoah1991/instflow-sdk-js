"use strict";

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _HttpProxy = require('./HttpProxy');

var _HttpProxy2 = _interopRequireDefault(_HttpProxy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {
    return {
        receive: function receive(event, next) {
            _HttpProxy2.default.commit({
                type: 'message',
                who: event.address.user.id,
                body: _lodash2.default.assign({}, event, {
                    orientation: 1,
                    msg_id: _nodeUuid2.default.v1()
                })
            }, 2);
            next();
        },
        send: function send(event, next) {
            _HttpProxy2.default.commit({
                type: 'message',
                who: event.address.user.id,
                body: _lodash2.default.assign({}, event, {
                    orientation: 2,
                    msg_id: _nodeUuid2.default.v1()
                })
            }, 2);
            next();
        }
    };
};
//# sourceMappingURL=DataAcquire.js.map
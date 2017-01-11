"use strict";

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _botbuilder = require('botbuilder');

var _HttpProxy = require('./HttpProxy');

var _HttpProxy2 = _interopRequireDefault(_HttpProxy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (opts) {
    if (opts == undefined || opts.bot == undefined) {
        throw 'Paramter \'bot\' not found.';
    }

    var lib = new _botbuilder.Library('human_agent');

    lib.dialog('/', function (session, args) {
        var body = _lodash2.default.pick(session, ['message', 'conversationData', 'privateConversationData', 'sessionState', 'userData']);
        body = _lodash2.default.assign(body, {
            orientation: 1,
            msg_id: _nodeUuid2.default.v1()
        });
        if (session.message.text != undefined && session.message.text.trim().toUpperCase() == 'Q') {
            session.send('Stop Human Agent.');
            _HttpProxy2.default.commit({
                type: 'stop_agent',
                who: session.message.address.user.id,
                body: body
            }, 2);
            session.endDialog();
        } else if (args != undefined && args.referer == '/start') {
            // notifying the instflow server that started a new dialog
            _HttpProxy2.default.commit({
                type: 'start_agent',
                who: session.message.address.user.id,
                body: body
            }, 2);
        } else {
            // talk
            _HttpProxy2.default.commit({
                type: 'agent_message',
                who: session.message.address.user.id,
                body: body
            }, 2);
        }
    });

    lib.dialog('/start', function (session, args) {
        session.send('Start Human Agent (Enter Q to exit):');
        session.replaceDialog('/', {
            referer: '/start'
        });
    });

    return lib;
};
//# sourceMappingURL=HumanAgent.js.map
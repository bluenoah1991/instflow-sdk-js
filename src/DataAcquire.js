"use strict";

import _ from 'lodash';
import uuid from 'node-uuid';
import HttpProxy from './HttpProxy';

module.exports = function () {
    return {
        receive: function (event, next) {
            HttpProxy.commit({
                type: 'message',
                who: event.address.user.id,
                body: _.assign({}, event, {
                    orientation: 1,
                    msg_id: uuid.v1()
                })
            }, 2);
            next();
        },
        send: function (event, next) {
            HttpProxy.commit({
                type: 'message',
                who: event.address.user.id,
                body: _.assign({}, event, {
                    orientation: 2,
                    msg_id: uuid.v1()
                })
            }, 2);
            next();
        }
    }
};

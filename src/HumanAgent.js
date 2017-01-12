"use strict";

import _ from 'lodash';
import uuid from 'node-uuid';
import {Message, Library, SimpleDialog} from 'botbuilder';
import HttpProxy from './HttpProxy';

module.exports = function(opts){
    if(opts == undefined || opts.bot == undefined){
        throw 'Paramter \'bot\' not found.';
    }

    var lib = new Library('human_agent');

    lib.dialog('/', function(session, args){
        let body = _.pick(session, ['message', 'conversationData', 'privateConversationData', 'sessionState', 'userData']);
        body = _.assign(body, {
            orientation: 1,
            msg_id: uuid.v1()
        });
        if(session.message.text != undefined && session.message.text.trim().toUpperCase() == 'BYE'){
            session.send('Bye bye.');
            HttpProxy.commit({
                type: 'stop_agent',
                who: session.message.address.user.id,
                body: body
            }, 2);
            session.endDialog();
        } else if(args != undefined && args.referer == '/start') {
            // notifying the instflow server that started a new dialog
            HttpProxy.commit({
                type: 'start_agent',
                who: session.message.address.user.id,
                body: body
            }, 2);
        } else {
            // talk
            HttpProxy.commit({
                type: 'agent_message',
                who: session.message.address.user.id,
                body: body
            }, 2);
        }
    });

    lib.dialog('/start', function(session, args){
        session.send('Let\'s chat now (Enter bye to exit):');
        session.replaceDialog('/', {
            referer: '/start'
        });
    });

    return lib;
};
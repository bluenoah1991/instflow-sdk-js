"use strict";

import {HttpPack} from 'http-pack';

export class HttpProxy {
    constructor() {
        this.access_token = process.env.INSTFLOW_ACCESS_TOKEN;
        this.httpPack = new HttpPack({
            callback: this.callback,
            requestOpts: {
                url: process.env.INSTFLOW_URL || 'https://www.instflow.com/api/v1/activities',
                headers: {
                    'Access-Token': this.access_token
                }
            }
        });
    }

    commit(data, qos = 0){
        if(data != undefined){
            this.httpPack.commit(Buffer.from(JSON.stringify(data)), qos);
        }
    }
}

export default new HttpProxy();
const EventEmitter = require('events');

const Axios = require('axios');
const debug = require('debug')('telegram-bot-wrapper:LongPool');

class LongPool extends EventEmitter {

    static get BASE_API_URL() {
        return 'https://api.telegram.org';
    };

    static get DEFAULT_TIMEOUT() {
        return 180000;
    };

    static get UPDATABLE_ENTITIES() {
        return [
            'message',
            'edited_message',
            'channel_post',
            'edited_channel_post',
            'inline_query',
            'chosen_inline_result',
            'callback_query',
            'shipping_query',
            'pre_checkout_query',
        ];
    }

    constructor(config) {
        super();
        this.initInstance();

        this.config = config;

        this.longPollInstance = LongPool.createInstance(LongPool.BASE_API_URL || this.config.baseApiURL, config.token, LongPool.DEFAULT_TIMEOUT || this.config.pollTimeout);

        if (this.longPollInstance) {
            let pollingProcess = this.startPolling();
        }
    }

    initInstance() {
        this.longPollInstance = null;
        this.isPolling = false;
        this.lastUpdate = {
            id: null,
            result: null,
            timestamp: null,
            data: null
        };
        this.config = {
            token: null,
            baseApiURL: null,
            pollTimeout: null
        };
    }

    static createInstance(baseApiURL, token, timeout = LongPool.DEFAULT_TIMEOUT, dataParams = {}) {
        return Axios.create({
            baseURL: `${baseApiURL}/bot${token}/`,
            timeout,
            data: Object.assign({
                timeout
            }, dataParams)
        });
    }

    async getUpdates(longPollInstance = this.longPollInstance) {
        if (longPollInstance) {
            return await longPollInstance.get('getUpdates', {
                params: {
                    offset: parseInt(this.lastUpdate.id) + 1
                }
            });
        } else {
            debug('longPollInstance is undefined');
            return Promise.reject('longPollInstance is undefined');
        }
    }

    async startPolling() {
        this.isPolling = true;

        while (this.isPolling) {
            try {
                let data = await this.getUpdates(this.longPollInstance);
                let handlerProcess = this.pollHandle(data);
            } catch (e) {
                /* happy song, nothing to do */
            }
        }
    }

    async pollHandle(response) {
        try {

            this.lastUpdate.timestamp = new Date().getTime();
            this.lastUpdate.id = response.data.result[response.data.result.length - 1].update_id;
            this.lastUpdate.result = response.data.ok;
            this.lastUpdate.data = response.data;

            response.data.result.forEach(update => {
                try {
                    LongPool.UPDATABLE_ENTITIES.forEach(entity => {
                        if (update.hasOwnProperty(entity)) {
                            this.emit(entity, update[entity]);
                        }
                    });
                } catch (e) {
                    debug(e);
                }
            });
        } catch (e) {
            debug(e);
        }
    }

    stopPolling() {
        this.isPolled = false;
    }

}

module.exports = LongPool;
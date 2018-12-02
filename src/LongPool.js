const EventEmitter = require('events');

const Axios = require('axios');
const debug = require('debug')('telegram-bot-api:LongPool');

class LongPool extends EventEmitter {

    static get BASE_API_URL() {
        return 'https://api.telegram.org';
    };

    static get DEFAULT_TIMEOUT() {
        return 180000;
    };


    constructor(config) {
        super();

        this.initInstance();

        this.longPollInstance = LongPool.createInstance(LongPool.BASE_API_URL, config.token);

        if (this.longPollInstance) {
            this.startPolling();
        }
    }

    initInstance() {
        this.longPollInstance = null;
        this.isPolled = false;
        this.lastUpdate = {
            id: null,
            result: null,
            timestamp: null,
            data: null
        };
    }
    static createInstance(baseApiURL, token, timeout = LongPool.DEFAULT_TIMEOUT, dataParams = {}) {
        return Axios
            .create({
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
        this.isPolled = true;

        while (this.isPolled) {
            try {
                let data = await this.getUpdates(this.longPollInstance);
                this.pollHandle(data);
            } catch (e) {
                /* happy song */
            }
        }
    }

    pollHandle(response) {
        try {


            this.lastUpdate.timestamp = new Date().getTime();
            this.lastUpdate.id = response.data.result[response.data.result.length - 1].update_id;
            this.lastUpdate.result = response.data.ok;
            this.lastUpdate.data = response.data;

            response.data.result.forEach(update => {
                try {
                    this.emit('message', update.message);
                } catch (e) {
                    console.error(e);
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
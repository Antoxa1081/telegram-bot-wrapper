const EventEmitter = require('events');

const Axios = require('axios');
const debug = require('debug')('telegram-bot-wrapper:MessageTransfer');

const MessageEntity = require('./entities/MessageEntity');

class MessageTransfer extends EventEmitter {

    static get BASE_API_URL() {
        return 'https://api.telegram.org';
    };

    constructor(config) {
        super();
        this.initInstance();

        this.config = config;

        this.requestInstance = MessageTransfer.createInstance(MessageTransfer.BASE_API_URL, this.config.token);

        this.initEntities();
    }

    static createInstance(baseApiURL, token, dataParams = {}) {
        return Axios.create({
            baseURL: `${baseApiURL}/bot${token}/`,
            data: Object.assign({}, dataParams)
        });
    }

    initEntities() {
        this.entities.message = new MessageEntity(this);
    }

    initInstance() {
        this.requestInstance = null;
        this.entities = {message};
        this.config = {
            token: null,
            baseApiURL: null
        };
    }
}

module.exports = MessageTransfer;
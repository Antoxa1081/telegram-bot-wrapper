const EventEmitter = require('events');
const LongPool = require('./LongPool');

const debug = require('debug')('telegram-bot-wrapper:TelegramBot');

/**
 * Importing handlers for update events
 */

const defaultMessageHandler = require('./handlers/defaultMessage');
const editedMessageHandler = require('./handlers/editedMessage');
const channelPostHandler = require('./handlers/channelPost');
const editedChannelPostHandler = require('./handlers/editedChannelPost');
const callbackQueryHandler = require('./handlers/callbackQuery');

/**
 * Class representing a TelegramBot.
 */

class TelegramBot extends EventEmitter {
    constructor(config) {
        super();
        this.initInstance();

        this.config = Object.assign({}, this.config, config);

        if (this.config.longPool) {
            this.initLongPool();
        }
    }

    initInstance() {
        this.config = {
            token: null,
            longPool: true
        };
    }

    initLongPool() {
        this.longPool = new LongPool(this.config);

        this.longPool.on('message', defaultMessageHandler(this));
        this.longPool.on('edited_message', editedMessageHandler(this));
        this.longPool.on('channel_post', channelPostHandler(this));
        this.longPool.on('edited_channel_post', editedChannelPostHandler(this));
        this.longPool.on('callback_query', callbackQueryHandler(this));
    }

    sendMessage(to, text, additional) {

    };
}

module.exports = TelegramBot;
const EventEmitter = require('events');

const LongPoll = require('./LongPoll');
const MessageTransfer = require('./MessageTransfer');

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

        if (this.config.longPoll) {
            this.initLongPoll();
        }
    }

    initInstance() {
        this.config = {
            token: null,
            longPoll: true
        };
    }

    initLongPoll() {
        this.longPoll = new LongPoll(this.config);

        this.longPoll.on('message', defaultMessageHandler(this));
        this.longPoll.on('edited_message', editedMessageHandler(this));
        this.longPoll.on('channel_post', channelPostHandler(this));
        this.longPoll.on('edited_channel_post', editedChannelPostHandler(this));
        this.longPoll.on('callback_query', callbackQueryHandler(this));
    }

    initMessageTransferEntities() {
        this.messageTransfer = new MessageTransfer(this.config);

        for (let entityName in this.messageTransfer.entities) {
            this[entityName] = this.messageTransfer.entities[entityName];
        }
    }
}

module.exports = TelegramBot;
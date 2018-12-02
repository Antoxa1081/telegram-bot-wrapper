const EventEmitter = require('events');

const debug = require('debug')('telegram-bot-wrapper:entities:Message');

class Message extends EventEmitter {

    constructor(messageTransferInstance, entityName) {
        super();

        this.entityName = entityName;
        this.messageTransferInstance = messageTransferInstance;
    }

    send(chatId, options) {
        return this.messageTransferInstance.requestInstance.get(`send${this.entityName}`, {
            params: Object.assign({chat_id: chatId}, options)
        });
    }

    edit() {

    }

    delete() {

    }

    forward() {

    }

    reply() {

    }

    pin() {

    }
}

module.exports = Message;
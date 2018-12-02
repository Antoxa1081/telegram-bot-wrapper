const debug = require('debug')('telegram-bot-wrapper:entities:MessageEntity');

const Message = require('./Message');

class MessageEntity extends Message {


    constructor(instance) {
        super(instance, 'Message');

        this.messageTransfer = instance;
    }

    send(id, text) {
        super.send(id, {text});
    }
}

module.exports = MessageEntity;

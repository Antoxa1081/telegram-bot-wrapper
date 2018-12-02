const debug = require('debug')('telegram-bot-wrapper:entities:PhotoEntity');

class PhotoEntity  {
    constructor(instance) {
        // super();
        this.messageTransfer = instance;
    }

}

module.exports = PhotoEntity;

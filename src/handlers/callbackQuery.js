const debug = require('debug')('telegram-bot-wrapper:handler:callbackQuery');

const baseEmitEvent = 'callback_query';

module.exports = instance => message => {
    try {
        instance.emit(`${baseEmitEvent}`, message);
        instance.emit(`${baseEmitEvent}:from:${message.from.id}`, message);
        instance.emit(`${baseEmitEvent}:chat:${message.chat_instance}`, message);

        if (message.from.hasOwnProperty('username')) {
            instance.emit(`${baseEmitEvent}:from:${message.from.username}`, message);
        }
    } catch (error) {
        debug(error);
    }
};

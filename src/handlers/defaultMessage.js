const debug = require('debug')('telegram-bot-wrapper:handler:defaultMessage');

const baseEmitEvent = 'message';

module.exports = instance => message => {
    try {

        instance.emit(baseEmitEvent, message);
        instance.emit(`${baseEmitEvent}:${message.chat.id}`, message);

        if (message.chat.id > 0) {

            instance.emit(`${baseEmitEvent}:user`, message);
            instance.emit(`${baseEmitEvent}:${message.from.id}`, message);

            if (message.from.hasOwnProperty('username')) {
                instance.emit(`${baseEmitEvent}:${message.from.username}`, message);
            }
        } else {

            instance.emit(`${baseEmitEvent}:chat`, message);
            instance.emit(`${baseEmitEvent}:${message.from.id}:chat`, message);
            instance.emit(`${baseEmitEvent}:${message.chat.id}:${message.from.id}`, message);

            if (message.from.hasOwnProperty('username')) {
                instance.emit(`${baseEmitEvent}:${message.from.username}:chat`, message);
                instance.emit(`${baseEmitEvent}:${message.сhat.id}:${message.from.username}`, message);
            }
        }
    } catch (error) {
        debug(error);
    }
};

const debug = require('debug')('telegram-bot-wrapper:handler:editedChannelPost');

const baseEmitEvent = 'edited_channel_post';

module.exports = instance => message => {
    try {

        let haveSender = message.hasOwnProperty('from');

        instance.emit(baseEmitEvent, message);
        instance.emit(`${baseEmitEvent}:${message.chat.id}`, message);


        instance.emit(`${baseEmitEvent}:from:${haveSender ? message.from.id : 0}`, message);
        instance.emit(`${baseEmitEvent}:${message.chat.id}:${haveSender ? message.from.id : 0}`, message);

        if (haveSender && message.from.hasOwnProperty('username')) {
            instance.emit(`${baseEmitEvent}:from:${message.from.username}`, message);
            instance.emit(`${baseEmitEvent}:${message.сhat.id}:${message.from.username}`, message);
        }

    } catch (error) {
        debug(error);
    }
};

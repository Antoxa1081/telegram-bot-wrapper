const EventEmitter = require('events');
const LongPool = require('./LongPool');

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

        this.longPool.on('message', message => {

            this.emit('message', message);
            this.emit(`message:${message.chat.id}`, message);

            if (message.chat.id > 0) {

                this.emit('message:user', message);
                this.emit(`message:${message.from.id}`, message);

                if (message.from.hasOwnProperty('username')) {
                    this.emit(`message:${message.from.username}`, message);
                }
            } else {

                this.emit('message:chat', message);
                this.emit(`message:${message.from.id}:chat`, message);

                if (message.from.hasOwnProperty('username')) {
                    this.emit(`message:${message.from.username}:chat`, message);
                }
            }
        });
    }

    sendMessage(to, text, additional) {

    };
}

module.exports = TelegramBot;
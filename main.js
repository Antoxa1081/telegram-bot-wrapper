const TelegramBot = require('./TelegramBot');

const bot = new TelegramBot({
    token: ''
});

bot.on('message', message => {
    console.log(message);
});
const TelegramBot = require('../src/TelegramBot');
const config = require('./config.bot'); // create own config.bot.js from example

const bot = new TelegramBot({
    token: config.token
});


/**
 * Examples for message listening
 */

bot.on(`message`, message => {
    console.log(message);
});

bot.on(`message:user`, message => {
    console.log(message);
});

bot.on(`message:group`, message => {
    console.log(message);
});

bot.on(`message:<username>`, message => {
    console.log(message);
});

bot.on(`message:<user_id>`, message => {
    console.log(message);
});

bot.on(`message:<user_id>:chat`, message => {
    console.log(message);
});

bot.on(`message:<username>:chat`, message => {
    console.log(message);
});

bot.on(`message:<group_id>`, message => {
    console.log(message);
});

bot.on(`message:<group_id>:<user_id>`, message => {
    console.log(message);
});

bot.on(`message:<group_id>:<username>`, message => {
    console.log(message);
});


/**
 * Examples for channel posts listening
 */

bot.on(`channel_post`, post => {
    console.log(post);
});

bot.on(`channel_post:<channel_id>`, post => {
    console.log(post);
});

bot.on(`channel_post:from:<user_id>`, post => {
    console.log(post);
});

bot.on(`channel_post:from:<username>`, post => {
    console.log(post);
});

bot.on(`channel_post:<channel_id>:<user_id>`, post => {
    console.log(post);
});

bot.on(`channel_post:<channel_id>:<username>`, post => {
    console.log(post);
});


/**
 * Examples for channel update posts listening
 */

bot.on(`edited_channel_post`, post => {
    console.log(post);
});

bot.on(`edited_channel_post:<channel_id>`, post => {
    console.log(post);
});

bot.on(`edited_channel_post:from:<user_id>`, post => {
    console.log(post);
});

bot.on(`edited_channel_post:from:<username>`, post => {
    console.log(post);
});

bot.on(`edited_channel_post:<channel_id>:<user_id>`, post => {
    console.log(post);
});

bot.on(`edited_channel_post:<channel_id>:<username>`, post => {
    console.log(post);
});


/**
 * Examples for callback_query listening
 */

bot.on(`callback_query`, callbackQuery => {
    console.log(callbackQuery);
});

bot.on(`callback_query:<user_id>`, callbackQuery => {
    console.log(callbackQuery);
});

bot.on(`callback_query:<username>`, callbackQuery => {
    console.log(callbackQuery);
});

bot.on(`callback_query:<chat_id>`, callbackQuery => {
    console.log(callbackQuery);
});

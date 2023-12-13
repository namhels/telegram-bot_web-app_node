// Name of bot - namhels_test_bot
// Use this token to access the HTTP API: 6776775082:AAGUpEa7a3fjpuf9JSBUB7x4JRbZcWKcsAQ

const TelegramBot = require("node-telegram-bot-api");

const token = "6776775082:AAGUpEa7a3fjpuf9JSBUB7x4JRbZcWKcsAQ";
const webAppUrl = "https://meek-boba-901598.netlify.app/";

const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    await bot.sendMessage(
      chatId,
      "A button will appear below, fill out the form",
      {
        reply_markup: {
          keyboard: [[{ text: "Fill out the form", web_app: {url: webAppUrl} }]],
        },
      }
    );
    
		await bot.sendMessage(
      chatId,
      "Go to our online store by clicking the button below",
      {
        reply_markup: {
          inline_keyboard: [[{ text: "Make an order", web_app: {url: webAppUrl} }]],
        },
      }
    );
  }
});

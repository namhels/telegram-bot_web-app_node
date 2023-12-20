// Name of bot - namhels_test_bot
// Use this token to access the HTTP API: 6776775082:AAGUpEa7a3fjpuf9JSBUB7x4JRbZcWKcsAQ

const TelegramBot = require("node-telegram-bot-api");
const express = require('express');
const cors = require('cors');

const token = "6776775082:AAGUpEa7a3fjpuf9JSBUB7x4JRbZcWKcsAQ";
const webAppUrl = "https://meek-boba-901598.netlify.app";

const bot = new TelegramBot(token, { polling: true });
const app = express();

app.use(express.json());
app.use(cors());

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    await bot.sendMessage(
      chatId,
      "A button will appear below, fill out the form",
      {
        reply_markup: {
          keyboard: [
            [
              {
                text: "Fill out the form",
                web_app: { url: webAppUrl + "/form" },
              },
            ],
          ],
        },
      }
    );

    await bot.sendMessage(
      chatId,
      "Go to our online store by clicking the button below",
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Make an order", web_app: { url: webAppUrl } }],
          ],
        },
      }
    );
  }

  if (msg?.web_app_data?.data) {
    try {
      const data = JSON.parse(msg?.web_app_data?.data);
      console.log(data);
      await bot.sendMessage(chatId, "Thanks for your feedback!");
      await bot.sendMessage(chatId, "Your country: " + data?.country);
      await bot.sendMessage(chatId, "Your street: " + data?.street);

      setTimeout(async () => {
        await bot.sendMessage(chatId, "You will receive all the information in this chat");
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  }
});

app.post('/web-data', async (req, res) => {
  const {queryId, products = [], totalPrice} = req.body;
  try {
      await bot.answerWebAppQuery(queryId, {
          type: 'article',
          id: queryId,
          title: 'Successful purchase',
          input_message_content: {
              message_text: ` Congratulations on your purchase, you have purchased an item worth ${totalPrice}, ${products.map(item => item.title).join(', ')}`
          }
      })
      return res.status(200).json({});
  } catch (e) {
      return res.status(500).json({})
  }
})

const PORT = 8000;

app.listen(PORT, () => console.log('server started on PORT ' + PORT))

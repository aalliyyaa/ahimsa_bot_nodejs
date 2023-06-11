const TelegramBot = require('node-telegram-bot-api');
// require('dotenv').config();
const schedule = require('node-schedule');


// Ваш код продолжается здесь

const token = "6157529765:AAGtHJ16hFo5CgLX79WRvBs3CkvFddD-gpg"
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

const questions = ["Уф, отзанимались ?", "Мы пришли?", "Горячо?", "Был Аштанга движ?", "Практикаовали сегодня?", "Были на аштанга утреннике?", "#потножаркогорячо ?"
]

const responses = [
"Қандай dedication!",
"Go home. Take rest",
"Огонь, детка! 🔥 ",
"Красава! 😎",
"All is coming! 🐾",
"Шала гордится тобой ✨",
"Светлое будущее уже тут. ",
"Береги свой внутренний сад 🪴 ",
"Да! Ты крут, Хот, woah-oh! ",
"Мои поклоны 🙏🏻",
"Вау! Ты молодец!"
]

// Функция для отправки случайного сообщения с кнопками
function sendRandomMessageWithButtons(chatId) {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomMessage = questions[randomIndex];
  
    const keyboard = [
      [{ text: 'Да' }, { text: 'Нет' }, { text: 'LH' }]
    ];
  
    const options = {
      reply_markup: JSON.stringify({
        keyboard,
        one_time_keyboard: true
      })
    };
  
    bot.sendMessage( chatId, randomMessage, options)
      .then((sentMessage) => {
        const chatIdsent = sentMessage.chat.id;
  
        // Ожидаем ответа на кнопки
        bot.onText(/Да/,  (msg) => {
          if (msg.chat.id === chatIdsent) {
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            bot.sendMessage(chatIdsent, randomResponse);
          }
        });
  
        bot.onText(/Нет/,  (msg) => {
          if (msg.chat.id === chatIdsent) {
             bot.sendMessage(chatIdsent, 'Возвращайся скорее, обнимасана');
          }
        });

        bot.onText(/LH/,  (msg) => {
            if (msg.chat.id === chatIdsent) {
              bot.sendMessage(chatIdsent, 'Береги себя, первые три дня не рекомендуется практиковать или делать только облегченную версию.');
            }
          });
      });
  }


// Определите задание планировщика вне обработчика команды /start
const job = schedule.scheduleJob('0 9 * * *', () => {
  // Получите список всех активных чатов бота
  const chatIds = Object.keys(bot._polling._chatIdPromiseMap);

  // Отправьте случайное сообщение с кнопками для каждого активного чата
  chatIds.forEach((chatId) => {
    sendRandomMessageWithButtons(chatId);
  });
});
  // Регулярная отправка случайных сообщений каждое утро в 9 часов

  bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Привет, love! Тебя привествует Ahimsa. Будем вместе потеть');
  sendRandomMessageWithButtons(chatId);
});

  


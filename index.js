require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
const token = process.env.DISCORD_BOT_TOKEN; // Load the token from environment variables

console.log(`discord.js version: ${require('discord.js').version}`);
console.log(`axios version: ${require('axios').VERSION}`);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log('Bot is online!');
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;

  console.log(`Received message: ${message.content}`);

  if (message.content.startsWith('!cairo')) {
    const userQuery = message.content.slice(7).trim();
    if (!userQuery) {
      message.reply('Please provide a question.');
      return;
    }

    console.log(`User query: ${userQuery}`);

    // Let the user know their request is being processed
    const processingMessage = await message.channel.send('Your request is being processed...');

    try {
      const response = await axios.post('https://cairo-chatbot.vercel.app/api/chat', {
        messages: [{ "role": "user", "content": userQuery }],
        previewToken: null
      });

      console.log('Full API response:', JSON.stringify(response.data, null, 2));

      const chatbotReply = response.data;

      if (chatbotReply && chatbotReply.trim()) {
        console.log('Chatbot reply:', chatbotReply);

        const maxMessageLength = 2000;
        if (chatbotReply.length > maxMessageLength) {
          const chunks = chatbotReply.match(new RegExp(`.{1,${maxMessageLength}}`, 'g'));
          for (const chunk of chunks) {
            await message.reply(chunk);
          }
        } else {
          message.reply(chatbotReply);
        }
      } else {
        console.log('Invalid chatbot reply:', chatbotReply);
        message.reply('The Cairo chatbot did not provide a valid response. Please try again.');
      }
    } catch (error) {
      console.error('Error interacting with the Cairo chatbot:', error);
      message.reply('There was an error interacting with the Cairo chatbot. Please try again later.');
    } finally {
      // Delete the processing message
      processingMessage.delete();
    }
  }
});

client.login(token);

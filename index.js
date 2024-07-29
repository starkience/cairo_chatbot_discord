require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
const token = process.env.BOT_TOKEN;

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

  // Updated to only include the new channel ID
  const allowedChannelIds = ['1267471383697428560'];
  if (!allowedChannelIds.includes(message.channel.id)) {
    return;
  }

  if (message.content.startsWith('!cairo')) {
    const userQuery = message.content.slice(7).trim();
    if (!userQuery) {
      message.reply('Please provide a question.');
      return;
    }

    console.log(`User query: ${userQuery}`);

    const processingMessage = await message.channel.send('Your request is being processed...');

    try {
      const response = await axios.post('https://cairo-chatbot.vercel.app/api/chat', {
        messages: [{ "role": "user", "content": userQuery }],
        previewToken: null
      });

      console.log('Full API response:', JSON.stringify(response.data, null, 2));

      let chatbotReply = response.data;
      if (typeof chatbotReply !== 'string') {
        chatbotReply = JSON.stringify(chatbotReply);
      }

      if (chatbotReply && chatbotReply.trim()) {
        console.log('Chatbot reply:', chatbotReply);

        await message.reply(chatbotReply);
      } else {
        console.log('Invalid chatbot reply:', chatbotReply);
        await message.reply('The Cairo chatbot did not provide a valid response. Please try again.');
      }
    } catch (error) {
      console.error('Error interacting with the Cairo chatbot:', error);
      await message.reply('There was an error interacting with the Cairo chatbot. Please try again later.');
    } finally {
      processingMessage.delete();
    }
  }
});

client.login(token);

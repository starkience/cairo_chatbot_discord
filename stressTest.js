require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const token = process.env.TEST_DISCORD_BOT_TOKEN; // Load the token from environment variables
const testChannelId = process.env.TEST_CHANNEL_ID; // Load the test channel ID from environment variables

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log('Test bot is online!');

  // Function to send multiple messages
  const sendMessages = async () => {
    const channel = client.channels.cache.get(testChannelId);
    if (!channel) {
      console.error('Test channel not found');
      return;
    }

    const totalMessages = 100; // Number of messages to send
    const delay = 1000; // Delay between messages in milliseconds

    for (let i = 1; i <= totalMessages; i++) {
      try {
        await channel.send(`!cairo Test message ${i}`);
        console.log(`Sent message ${i}`);
      } catch (error) {
        console.error(`Failed to send message ${i}:`, error);
      }
      await new Promise(resolve => setTimeout(resolve, delay)); // Delay between messages
    }
  };

  sendMessages();
});

client.login(token);

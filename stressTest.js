require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');

const token = process.env.TEST_DISCORD_BOT_TOKEN;
const testChannelId = process.env.TEST_CHANNEL_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences
  ]
});

client.once('ready', () => {
  console.log('Test bot is online!');

  const channel = client.channels.cache.get(testChannelId);
  if (!channel) {
    console.error('Test channel not found');
    return;
  }

  console.log(`Using channel: ${channel.name} (ID: ${channel.id})`);

  const sendMessages = async () => {
    const totalMessages = 100;
    const delay = 1000;

    for (let i = 1; i <= totalMessages; i++) {
      try {
        await channel.send(`!cairo Test message ${i}`);
        console.log(`Sent message ${i}`);
      } catch (error) {
        console.error(`Failed to send message ${i}:`, error);
      }
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  };

  sendMessages();
});

client.login(token);

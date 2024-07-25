# Cairo Bot for Discord

This bot sends questions to the Cairo Chatbot ([Cairo Chatbot](https://cairo-chatbot.vercel.app/)) via its API and sends back an answer in the Discord server.

## Example
![Example Screenshot](https://github.com/user-attachments/assets/de1657aa-59c0-440c-8a93-8182e9ce0281)

## How to Use the Bot
In the Discord channel, use the following command:
```
!Cairo <your prompt goes here>
```

## How to Implement the Bot in Your Channel
If you want to use the bot for your own Discord server, follow these steps:

1. Go to the [Discord Developer Portal](https://discord.com/developers/docs/intro).
2. Click "New Application" and give your application a name.
3. Go to the "Bot" tab on the left sidebar.
4. Copy the TOKEN of your bot.
5. In your code editor, in the `.env-example` file, replace `<your_discord_token_bot_here>` with your bot's token.
6. Run `node index.js`.

## Installation
Don't forget to install the necessary packages:
```
npm install discord.js
npm install axios
npm install dotenv
```



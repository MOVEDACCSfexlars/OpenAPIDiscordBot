const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client();
 
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
 
client.on('messageCreate', msg => {
    if (msg.author.id == client.user.id) return
    if (msg.channelId == process.env.WHITELISTED_CHANNEL)
    {
        async function start() {
            const completion = await openai.createCompletion({
                model: "text-davinci-002",
                prompt: `Me: ${msg.content} You:`,
                max_tokens: 100,
            });
            var result = completion.data.choices[0].text
            if (result == '' || result == null) return
            msg.reply(result);
        }
        
        start();
    }
});
 
client.login(process.env.DISCORD_TOKEN);
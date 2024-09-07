const { Client, GatewayIntentBits } = require('discord.js');
const schedule = require('node-schedule');
const fetch = require('node-fetch');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const MyChannelId = "984726930689503255";
const UsersID = require("./user");

const SecretName = "Ghost";
const SecretImageUrl = "https://i.pinimg.com/originals/3f/c3/f8/3fc3f8d7c7d7f4e2db533dada36d5db4.jpg";

const oldName = "Test-1 Bot";
const oldImageUrl = "https://logodownload.org/wp-content/uploads/2017/11/discord-logo-1-1.png";

let isInSecretMode = false;

const SecretMode = async () => {
  if (!isInSecretMode) {
    try {
      await client.user.setUsername(SecretName);
      await client.user.setAvatar(SecretImageUrl);
      isInSecretMode = true;
      console.log('Switched to ghost mode.');
    } catch (error) {
      console.error('Error switching to ghost mode:', error);
    }
  }
};

const PlainMode = async () => {
  if (isInSecretMode) {
    try {
      await client.user.setUsername(oldName);
      await client.user.setAvatar(oldImageUrl);
      isInSecretMode = false;
      console.log('Reverted to plain mode.');
    } catch (error) {
      console.error('Error reverting to plain mode:', error);
    }
  }
};

const UserPing = async () => {
  try {
    if (!isInSecretMode) {
      await SecretMode();
    }
    let shuffledUsers = UsersID.sort(() => Math.random() - 0.5);
    let randomId = shuffledUsers[0];
    const channel = await client.channels.fetch(MyChannelId);

    if (channel) {
      const botMessage = await channel.send(`Hello <@${randomId}>`);
      setTimeout(async () => {
        await botMessage.delete();
        console.log(`Message sent to <@${randomId}> and deleted.`);
      }, 30000);
      setTimeout(PlainMode, 120000);
    }
  } catch (error) {
    console.error('Error in UserPing:', error);
  }
};

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  schedule.scheduleJob("57 24 * * *", async () => {
    await SecretMode(); 
  });
  schedule.scheduleJob("15 14 * * *", UserPing);
});

// Normal functions
const sadWords = ["sad", "depressed", "unhappy", "angry"];
const encouragements = [
  "Cheer up!",
  "Hang in there",
  "You are a great person/bot",
];

function getQuote() {
  return fetch("https://zenquotes.io/api/random")
    .then(res => res.json())
    .then(data => data[0]["q"] + " -" + data[0]["a"]);
}

client.on("messageCreate", message => {
  if (message.author.bot) return;

  if (message.content.toLowerCase().startsWith("hi")) {
    message.reply({ content: "Hi 😊😊" });
  } else if (message.content.toLowerCase().startsWith("hello")) {
    message.reply({ content: "Hello 😊😊" });
  } else if (message.content.toLowerCase().startsWith("binod is") || message.content.toLowerCase().startsWith("binod")) {
    message.reply({ content: "Noob" });
  } else if (message.content === "$inspire") {
    getQuote().then(quote => message.reply(quote));
  } else if (sadWords.some(word => message.content.includes(word))) {
    const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
    message.reply(encouragement);
  }
});

client.login("MTI3Nzk1NzQ4NjkwMDU0NzU5Ng.GxtjyQ.6uT5HO0-TYhyenFd48DF6FOwbgzGDMTYc5fSKc");

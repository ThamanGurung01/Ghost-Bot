const { Client, GatewayIntentBits }=  require('discord.js');
const schedule = require('node-schedule');
const fetch=require("node-fetch");
const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMembers,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent] });

const MyChannelId="984726930689503255";
// const userId="618625045769748482";
const UsersID=require("./user");

let randomId=UsersID[Math.floor(Math.random()*UsersID.length)];
const SecretName= "Ghost";
const SecretImageUrl="https://www.clipartmax.com/png/small/3-30793_creepy-discord-icon-logo-remix-by-treetoadart-discord-icon.png";

const oldName="Test-1 Bot";
const oldImageUrl="https://www.clipartmax.com/png/small/226-2261845_content-creator-influencer-relations-discord-icon-transparent-small.png";


const SecretMode=async()=>{
  await client.user.setUsername(SecretName);
  await client.user.setAvatar(SecretImageUrl);
    }


 const PlainMode=async()=>{
      await client.user.setUsername(oldName);
      await client.user.setAvatar(oldImageUrl);
    }

const UserPing=async()=>{
  try{
const channel =await client.channels.fetch(MyChannelId);
   if(channel) {
    const botMessage=await channel.send(`Hello <@${randomId}>`);
setTimeout(() => {botMessage.delete();}, 30000);
setTimeout(PlainMode,120000);
  }
      }catch(error){
        console.log("error");
      }
}



client.once('ready', async() => {
  console.log(`Logged in as ${client.user.tag}!`);
  schedule.scheduleJob("57 24 * * *",SecretMode);
  schedule.scheduleJob("0 0 * * *",UserPing);
});


//normal functions
const sadWords=["sad","depressed", "unhappy","angry"];

const encouragements=[
  "Cheer up!",
  "Hang in there",
  "you are a great person/bot",
]

function getQuote(){
  return fetch("https://zenquotes.io/api/random").then(res=>{
    return res.json();
  }).then(data=>{
    return data[0]["q"] + " -" + data[0]["a"]
  })
}


client.on("messageCreate",message=>{
  if(message.author.bot) return;
  if(message.content.toLowerCase().startsWith("hi")){
    message.reply({
      content: "Hi 😊😊"});
  }else if(message.content.toLowerCase().startsWith("hello")){
    message.reply({
      content: "Hello 😊😊"});
  }
  if(message.content ==="$inspire"){
    getQuote().then(quote=> message.reply(quote));
  }

  if(sadWords.some(word=>message.content.includes(word))){
    const encouragement=encouragements[Math.floor(Math.random()*encouragements.length)]
    message.reply(encouragement);
  }
})


client.login("MTI3Nzk1NzQ4NjkwMDU0NzU5Ng.GMREza.sAWFuZZyB5yezN6ueaul-jPkUdOmdcBpeqBbIM");
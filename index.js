const { Client, GatewayIntentBits }=  require('discord.js');
const schedule = require('node-schedule');
const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMembers,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent] });

const MyChannelId="1277918596781309967";
const userId="618625045769748482";

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
    const botMessage=await channel.send(`Hello <@${userId}>`);
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

client.on("messageCreate",message=>{
  console.log(message.content);
  if(message.author.bot) return;
  message.reply("test");
})

client.login("MTI3Nzk1NzQ4NjkwMDU0NzU5Ng.GMREza.sAWFuZZyB5yezN6ueaul-jPkUdOmdcBpeqBbIM");
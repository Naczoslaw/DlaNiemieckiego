const {client} = require('../index');
const Discord = require("discord.js");
const config = require("../config/config");

client.on('message', message => {

    if(message.author.bot) return;
    if(message.channel.id === config.twitterID) {

        const embed = new Discord.MessageEmbed()
            .setDescription("**" + message.content +"**")
            .setColor(`#2106eb`)
            .setAuthor('Twitter', 'https://media.discordapp.net/attachments/925844474817556510/934091758898393128/580b57fcd9996e24bc43c53e.png?width=676&height=676')
            .setTimestamp( )
            .setFooter(config.nazwa);

if(message.attachments.find(u => u)){
                const a = (message.attachments.find(u => u))
                if(a.height){
                    embed.setImage(`${a.proxyURL}`)
                }
            }

        message.reply(embed);

        message.delete();
    }
});
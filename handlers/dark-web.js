const {client} = require('../index');
const Discord = require("discord.js");
const config = require("../config/config");

client.on('message', message => {

    if(message.author.bot) return;
    if(message.channel.id === config.darkwebID) {

        const embed = new Discord.MessageEmbed()
            .setDescription("**" + message.content + "** ")
            .setColor(`#000`)
            .setAuthor('Dark-Web', `${message.author.avatarURL()}`)
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
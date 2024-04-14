const {client} = require('../index');
const Discord = require("discord.js");
const config = require("../config/config");

client.on('message', message => {

    if(message.author.bot) return;
    if(message.channel.id === config.instagramID) {

        const embed = new Discord.MessageEmbed()
            .setDescription("**" + message.content +"**")
            .setColor(`#2106eb`)
            .setAuthor('instagram', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png')
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
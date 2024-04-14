const {client} = require('../index');
const Discord = require("discord.js");
const config = require("../config/config");

client.on('message', message => {

    if(message.author.bot) return;
    if(message.channel.id === config.opiniaID) {

        const embed = new Discord.MessageEmbed()
            .setDescription("dziękuje za pozostawienie Twojej opini!")
            .setColor(`#5a0c64`)
            .setAuthor('Dawid-Bots', ``)
            .setTimestamp( )

if(message.attachments.find(u => u)){
                const a = (message.attachments.find(u => u))
                if(a.height){
                    embed.setImage(`${a.proxyURL}`)
                }
            }

message.author.send('', { embed: embed, content: `${message.author}`, })
        .then(function (message) {
            message.react('💙')
        })
    }
});
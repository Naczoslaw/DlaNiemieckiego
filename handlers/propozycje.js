const {client} = require('../index');
const Discord = require("discord.js");
const config = require("../config/config");

client.on('message', async message => {

    if(message.author.bot) return;
    if(message.channel.id === config.propozycjeID) {
        if (message.content.startsWith("$")) {
            message.delete();
            const Komentarz = new Discord.MessageEmbed()
                .setDescription(message.content.substring(1))
                .setAuthor('Komentarz', '', '')
                .setFooter(config.nazwa);
            await message.channel.send(Komentarz);


        } else {

            const propozycje = new Discord.MessageEmbed()
                .setDescription("**" + message.content + "**")
                .setColor(`#06eb1d`)
                .setAuthor('Propozycja', `${message.author.avatarURL()}`, '')
                .setTimestamp( )
                .setFooter(config.nazwa);

 if(message.attachments.find(u => u)){
                const a = (message.attachments.find(u => u))
                if(a.height){
                    propozycje.setImage(`${a.proxyURL}`)
                }
            }
            let a = message.reply(propozycje).then(msg => {
                msg.react('✅');
                msg.react('❌');
            })
            await message.delete();
        }
    }
});
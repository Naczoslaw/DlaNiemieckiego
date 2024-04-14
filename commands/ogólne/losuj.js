const { MessageEmbed } = require('discord.js')
const { poczekalnia, kanal_do_komendy, nazwa } = require('../../config/config');

module.exports.run = async (Client, message, prefix) => {

    if(!message.content.startsWith(prefix)) return;
    if(message.channel.id == kanal_do_komendy) {
        const channel = message.guild.channels.cache.get(poczekalnia);
        if(channel.members.random() != null) {
            const wylosowane = new MessageEmbed()
            .setTitle('Losowanie')
            .setDescription('Wylosowałeś: <@' + channel.members.random() + '>')
            .setColor('#00ff00')
            .setTimestamp()
            .setFooter(`${nazwa}`)
            message.channel.send("", {
                content: `${message.author}`,
                embed: wylosowane
              })
        } else { 
            const nikt = new MessageEmbed()
            .setTitle('Losowanie')
            .setDescription("Brak osób na kanale!")
            .setColor('#ff0000')
            .setTimestamp()
            .setFooter(`${nazwa}`)
            message.channel.send("", {
                content: `${message.author}`,
                embed: nikt
              })
        }
        }
    }

module.exports.help = {
    name: `losuj`,
    aliases: [""]
};
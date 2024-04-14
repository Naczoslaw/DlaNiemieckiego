const {client} = require('../index');
const Discord = require("discord.js");
const { nazwa, powitalniakanal, avatar } = require('../config/config')


client.on('guildMemberRemove', member => {
    const pożegnalnawiadomosc = new Discord.MessageEmbed()
        .setAuthor(`${member.user.tag}!`, avatar)
        .setDescription(`Użytkownik wyszedł z serwera! Zostało nas już tylko **${client.guilds.cache.get(member.guild.id).memberCount}**`)
        .setColor('#ff0000')
        .setTimestamp()
        .setThumbnail(member.user.displayAvatarURL())
        .setFooter(nazwa);
    client.channels.cache.get(powitalniakanal).send(pożegnalnawiadomosc);
})
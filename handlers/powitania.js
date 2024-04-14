const { MessageEmbed } = require('discord.js')
const {client} = require('../index');
const { powitalniakanal, nazwa } = require('../config/config')

client.on('guildMemberAdd', caityln  => {
    const janalise = new MessageEmbed()
	 .setAuthor(caityln.user.tag)
     .setDescription(`Witaj na **${nazwa}**! Jesteś naszym: **${client.guilds.cache.get(caityln.guild.id).memberCount}** użytkownikiem!`)
     .setColor('#7945cc')
	 .setThumbnail(caityln.user.displayAvatarURL())
     .setTimestamp()
    client.channels.cache.get(powitalniakanal).send(`${""}${caityln}${" "}`, janalise).then(davario => {
    setTimeout(() => {
      davario.edit(`${""}`, janalise);
    }, 1e4);
  });
});
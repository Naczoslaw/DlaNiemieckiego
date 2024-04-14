const { MessageEmbed } = require('discord.js')
const { nazwa, avatar } = require('../../config/config');

module.exports.run = async (Client, message, args, prefix) => {

    if(!message.content.startsWith(prefix)) return;
    let użytkownik = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const apiPing = Client.ws.ping

        let days = Math.floor(Client.uptime / 86400000);
        let hours = Math.floor(Client.uptime / 3600000) % 24;
        let minutes = Math.floor(Client.uptime / 60000) % 60;
        let seconds = Math.floor(Client.uptime / 1000) % 60;

    const ping = new MessageEmbed()
	.setTitle('PING')
    .setColor("#0642eb")
    .setDescription(`Ping Discord API: \`${apiPing}\` \n Uptime: \`${days}d ${hours}h ${minutes}m ${seconds}s\` `)
    .setTimestamp()
    .setFooter(nazwa, avatar);
    message.channel.send("", {
        content: `${message.author}`,
        embed: ping
      })
  

    }

module.exports.help = {
    name: `ping`,
    aliases: [""]
};
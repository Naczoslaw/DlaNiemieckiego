const discord = require('discord.js')
const distube = require('distube')
const { nazwa } = require('../../config/config')

module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return
	const vccc = new discord.MessageEmbed()
    .setTitle('Muzyka-BŁĄD')
    .setDescription(`dołącz do vc przed przed użyciem tej Komendy`)
	.setColor("#ff0000")
    .setFooter(`${nazwa}`)
    .setTimestamp()
    if(!message.member.voice.channel) return message.channel.send(vccc)
    const music = args.join(" ")
    const start = new discord.MessageEmbed()
    .setTitle('Muzyka-BŁĄD')
    .setDescription(`proszę podać piosenkę do odtworzenia`)
	.setColor("#ff0000")
    .setFooter(`${nazwa}`)
    .setTimestamp()
    if(!music) return message.channel.send(start)
    Client.distube.play(message, music)
}

module.exports.help = {
    name: 'play',
    aliases: []
}
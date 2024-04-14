const discord = require('discord.js')
const distube = require('distube')
const { client } = require('../..')
const { nazwa } = require('../../config/config')

module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return
	const vcc = new discord.MessageEmbed()
        .setTitle('Muzyka')
        .setDescription(`dołącz do vc przed użyciem tej Komendy`)
		.setColor("#ff0000")
        .setFooter(`${nazwa}`)
        .setTimestamp()
    if(!message.member.voice.channel) return message.channel.send(vcc)
    let queue = await Client.distube.getQueue(message)
    if(queue) {
        Client.distube.stop(message)
        const koniec = new discord.MessageEmbed()
        .setTitle('Muzyka')
        .setDescription(`Impreza skończona, ${client.user} się rozłącza`)
		.setColor("#ff0000")
        .setFooter(`${nazwa}`)
        .setTimestamp()
        message.channel.send(koniec)
    } else if(!queue) {
        return
    }
}

module.exports.help = {
    name: 'stop',
    aliases: []
}
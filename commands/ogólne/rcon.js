const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js');
const { client } = require('../..');
var Q3RCon = require('quake3-rcon')
const { radress, rport, rpassword, kanallogi, dosteprcon } = require('../../config/config');

const upr = new MessageEmbed()
.setTitle('BAN')
.setColor("#ff0000")
.setDescription(`Nie masz rangi: <@&${dosteprcon}>`)

module.exports.run = async (Client, message, args, prefix) => {

    if(!message.content.startsWith(prefix)) return;
	const logi = message.guild.channels.cache.get(kanallogi)
	 if(!message.member.roles.cache.has(dosteprcon)){
        return message.channel.send(upr)}
	var time = new Date().toLocaleString()

        const embed = new MessageEmbed()
.setDescription(`Komenda w trakcie wysyłania!`)
.setColor(`#d9ff00`)
        const wyslanyembed = await message.channel.send(embed)

        try {
            var rcon = new Q3RCon({
                address: radress,
                port: rport,
                password: rpassword,
            });
            const komenda = args.join(` `)
            rcon.send(komenda, function (response) {
                const embedend = new MessageEmbed().setColor(`#00ff15`).setDescription(`Komenda \`${komenda}\` została wysłana do konsoli!\n\n**Odpowiedź z konsoli:** \n\`${response}\``)
                wyslanyembed.edit(embedend)
                const logis = new MessageEmbed().setColor(`#00ffb9`).setAuthor(message.author.tag, message.author.avatarURL()).setTitle(`RCON`).setFooter(`Data: ${time}`)
                    .setDescription(`Komenda \`${komenda}\` została wysłana do konsoli przez ${message.author} | ${message.author.tag}`)
                logi.send(logis)
            });
        } catch (error) {
            const embederr = new MessageEmbed().setColor(`#ff0000`).setDescription(`Podczas wysyłania komendy wystąpił błąd!\n**Błąd:**\n${error}`)
            wyslanyembed.edit(embederr)
        }
            }

module.exports.help = {
    name: `rcon`,
    aliases: [""]
};
const { MessageEmbed } = require('discord.js')
const {client} = require('../index');
const Discord = require("discord.js");
const config = require("../config/config");

client.on('message', async (message) => {

    if(message.author.bot) return;
    if(message.channel.type === `dm`) return

    if (message.content.includes(`discord.gg`)) {
        if (message.member.permissions.has("ADMINISTRATOR")) {
            return;
        } else {
            message.delete();

var czas = new Date().toLocaleString()

const embed1 = new Discord.MessageEmbed()
.setTitle('ANTY-LINK')
.setColor("#ff0000")
.setDescription(`${message.author} **Nie możesz wysłać zaprozeń!**`)
.setFooter(`Data: ${czas}`)
            message.author.send(embed1).catch(() => {})
        }
    } else {
        return;
    }
});
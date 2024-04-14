const discord = require('discord.js');
const { MessageButton, MessageActionRow } = require("discord-buttons")
const { MessageEmbed } = require('discord.js');
const { nazwa } = require('../../config/config');

module.exports.run = async (Client, message, args, prefix) => {

    if(!message.content.startsWith(prefix)) return;
    
      const upr = new discord.MessageEmbed()
      .setTitle('Weryfikacja')
      .setColor("#ff0000")
      .setDescription('Nie masz uprawnień')

    if(!message.member.hasPermission("ADMINISTRATOR")){
        return message.lineReplyNoMention(upr)
      }

    const embed = new discord.MessageEmbed()
    .setTitle('Weryfikacja')
    .setColor("green")
    .setDescription('Kliknij przycisk aby zostać zweryfikowanym!')

const add = new MessageButton()
    .setStyle("green")
    .setLabel("Zweryfikuj się!")
    .setEmoji(`💡`)
    .setID("Weryfikacja")

const row = new MessageActionRow()
    .addComponent([add])

    message.delete()
    message.channel.send({component: row, embed: embed})
}

module.exports.help = {
    name: `ustawweryfikacja`,
    aliases: [""]
};
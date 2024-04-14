const { MessageEmbed } = require('discord.js')
const { MessageButton } = require("discord-buttons")
const { format } = require('mysql');

module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return

    const member = message.mentions.members.first() || message.member;
    

  
        const avatar = new MessageEmbed()
        .setTitle(`avatar użytkownika: ${member.user.tag}`)
        .setImage(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setColor("#06eba0")
        .setFooter(`komendy użył: @${message.author.tag}`)
        .setTimestamp()


        let button1 = new MessageButton()
        .setURL(member.user.displayAvatarURL({ dynamic: true, size: 512, format: "png" }))
        .setLabel('png')
        .setStyle('url')

        let button2 = new MessageButton()
      .setURL(member.user.displayAvatarURL({ dynamic: true, size: 512, format: "jpg" }))
      .setLabel('JPG')
      .setStyle('url')

      let button3 = new MessageButton()
      .setURL(member.user.displayAvatarURL({ dynamic: true, size: 512, format: "webp" }))
      .setLabel('webp')
      .setStyle('url')

    message.channel.send('', {
        embed: avatar,
        button: [button1, button2, button3]
    });

    message.delete()

}

module.exports.help = {
    name: 'avatar',
    aliases: []
}
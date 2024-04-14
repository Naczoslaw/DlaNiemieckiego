const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js")
const { MessageMenuOption, MessageMenu } = require("discord-buttons")
const { listaidrolmenu, emoji } = require(`../../config/config`)
if(listaidrolmenu.length != emoji.length) console.log("Długość list nie jest taka sama!")

const { nazwa, avatar } = require(`../../config/config`)

module.exports.run = async (Client, message, args, prefix) => {

    if(!message.content.startsWith(prefix)) return;
    
    const upr = new Discord.MessageEmbed()
    .setTitle('Błąd')
    .setColor("#ff0000")
    .setDescription('Nie masz uprawnień')

  if(!message.member.hasPermission("ADMINISTRATOR")){
      return message.lineReplyNoMention(upr)
    }

    const { guild } = message

    const role = []
    for (let i = 0; i < listaidrolmenu.length; i++) {
        const rola = guild.roles.cache.get(listaidrolmenu[i])
const embedss = new MessageEmbed()
.setTitle('Błąd')
.setColor('green')
.setDescription(`Nie znaleziono roli nr: ${i}`)
.setTimestamp( )
.setFooter('Ustaw to w config.js');
if(!rola) return message.channel.send(embedss)
        role.push(rola)
    }
    //
    let options = [], i = 0
    role.forEach(rola => {
        const option = new MessageMenuOption()
            .setLabel(rola.name)
            .setEmoji(emoji[i])
            .setDescription(`Kliknij ${rola.name}`)
            .setValue(i)
        options.push(option)
        i++
    })
    let select = new MessageMenu()
        .setID('select-role')
        .setPlaceholder("Kliknij aby wybrać role!")
        .setMaxValues(1)
        .setMinValues(1)
        .addOption(new MessageMenuOption()
            .setLabel("-")
            .setValue("-")
        )
    options.forEach(option => {
        select.addOption(option)
    })
    //
    const embed = new MessageEmbed().setColor(`#08ffff`).setAuthor(nazwa, avatar).setDescription("Kliknij aby wybrać Role!").setThumbnail(avatar)
    //
    message.delete()
    message.channel.send('', {
        component: select,
        embed: embed
    });
}

module.exports.help = {
    name: `ustawrole`,
    aliases: [""]
};
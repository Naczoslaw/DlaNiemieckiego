const { MessageEmbed } = require('discord.js')
const { MessageButton } = require("discord-buttons")
const { nazwa, dosteppak } = require('../../config/config');

const upr = new MessageEmbed()
.setTitle('PAK')
.setColor("#ff0000")
.setDescription(`Nie masz rangi: <@&${dosteppak}>`)

const pakbłąd = new MessageEmbed()
.setTitle("BŁĄD")
.setColor("#ff0000")
.setDescription(`Nie napisałeś wiadomości która ma zostać wysłana`)
.setTimestamp()
.setFooter(`${nazwa}`)


const użytkownikbłąd = new MessageEmbed()
.setTitle('BŁĄD')
.setColor("#ff0000")
.setDescription(`Nie podałeś użytkownika który ma dostać wiadomość`)


module.exports.run = async (Client, message, args, prefix) => {

    if(!message.content.startsWith(prefix)) return;
    const { mentions, author } = message
    let użytkownik = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let pak = args.slice(1).join(" ");
    if (!pak) return message.channel.send(pakbłąd);
    if (!użytkownik) return message.channel.send(użytkownikbłąd);
    if(!message.member.roles.cache.has(dosteppak)){
      return message.channel.send(upr)}
    var time = new Date().toLocaleString()

   const poprawne = new MessageEmbed()
   .setTitle("BOT")
   .setDescription(`Pakiet ${pak} Został wysłany do ${użytkownik}`)
   .setColor('#b30007')
   .setFooter(`${nazwa}`)
   .setTimestamp()
message.channel.send(poprawne)

const dm = new MessageEmbed()
.setTitle("BOT")
.setDescription(`Hej czy chcesz kupić pakiet: \`${pak}\` Jeśli chcesz kupić wpisz **TAK** jeśli nie wpisz **NIE**`)
.setColor('#b30007')
.setFooter(`${nazwa}`)
.setTimestamp()
użytkownik.send(dm)


 }

module.exports.help = {
    name: `pakiet`,
    aliases: [""]
};
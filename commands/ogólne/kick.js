const { MessageEmbed } = require('discord.js')
const { client } = require('../..');
const { nazwa, kanallogi, dostepkick } = require('../../config/config');

const upr = new MessageEmbed()
.setTitle('KICK')
.setColor("#ff0000")
.setDescription(`Nie masz rangi: <@&${dostepkick}>`)

const powodbłąd = new MessageEmbed()
.setTitle("BŁĄD")
.setColor("#ff0000")
.setDescription(`Napisz powód`)
.setTimestamp()
.setFooter(`${nazwa}`)


const użytkownikbłąd = new MessageEmbed()
.setTitle('BŁĄD')
.setColor("#ff0000")
.setDescription(`musisz podać osobę którą chesz wyrzucić!`)


module.exports.run = async (Client, message, args, prefix) => {

    if(!message.content.startsWith(prefix)) return;
    const { mentions, author, guild } = message
    let użytkownik = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let powod = args.slice(1).join(" ");
    const logi = message.guild.channels.cache.get(kanallogi)
    if(!message.member.roles.cache.has(dostepkick)){
        return message.channel.send(upr)}
    if(!powod) return message.channel.send(powodbłąd);
    if(!użytkownik) return message.channel.send(użytkownikbłąd);
    var time = new Date().toLocaleString()

    const userban = mentions.users.first()

    if (userban.id === author.id) {
        const blad3 = new MessageEmbed()
        .setTitle("KICK")
        .setDescription("Nie możesz wyrzucić samego siebie")
        .setColor('#b30007')
        .setFooter(`${nazwa}`)
        .setTimestamp()
        message.channel.send("", {
            content: `${message.author}`,
            embed: blad3
          })
          return
      }

      const memberToBan = guild.members.cache.get(userban.id)

    if (!memberToBan.bannable) {
        const błąd4 = new MessageEmbed()
        .setTitle("KICK")
        .setDescription(`bot potrzebuje więcej permisji aby wyrzucić ${użytkownik}`)
        .setColor('#ff0000')
        .setTimestamp()
        message.channel.send("", {
            content: `${message.author}`,
            embed: błąd4
          })
      return
    }
  

    const server = new MessageEmbed()
    .setTitle('KICK')
    .setDescription(`${użytkownik} popraniwe został wyrzucony z serwera! \n\n powód: ${powod}`)
    .setTimestamp()
    .setFooter(`${nazwa}`)
    message.channel.send("", {
        content: `${message.author}`,
        embed: server
      })

      const wiadomosclogi = new MessageEmbed()
      .setTitle("KICK")
      .setColor("#ed4245")
      .setDescription(`Użytkownik: ${użytkownik} | ${użytkownik.id} został wyrzucony z serwera przez: ${message.author} \n data: ${time} \n pwoód: ${powod} `)
      .setTimestamp()
      logi.send(wiadomosclogi)

        const kickdm = new MessageEmbed()
        .setTitle(`KICK`)
        .setDescription(`Zostałeś wyrzucony z serwera: **${nazwa}** przez: ${message.author} \n\n powód: ${powod}`)
        .setColor(`#ff0000`)
        .setTimestamp()
        await użytkownik.send(kickdm)
  
      użytkownik.kick({reason: powod})

    }

module.exports.help = {
    name: `kick`,
    aliases: [""]
};
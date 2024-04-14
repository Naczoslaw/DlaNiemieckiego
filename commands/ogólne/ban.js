const { MessageEmbed } = require('discord.js')
const { client } = require('../..');
const { nazwa, kanallogi, dostepbany } = require('../../config/config');

const upr = new MessageEmbed()
.setTitle('BAN')
.setColor("#ff0000")
.setDescription(`Nie masz rangi: <@&${dostepbany}>`)

const powodbłąd = new MessageEmbed()
.setTitle("BŁĄD")
.setColor("#ff0000")
.setDescription(`Napisz powód bana`)
.setTimestamp()
.setFooter(`${nazwa}`)


const użytkownikbłąd = new MessageEmbed()
.setTitle('BŁĄD')
.setColor("#ff0000")
.setDescription(`Nie podałeś użytkownika który ma zostać zbanowany`)


module.exports.run = async (Client, message, args, prefix) => {

    if(!message.content.startsWith(prefix)) return;
    const { mentions, author, guild } = message
    let użytkownik = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let powod = args.slice(1).join(" ");
    const logi = message.guild.channels.cache.get(kanallogi)
    if(!message.member.roles.cache.has(dostepbany)){
        return message.channel.send(upr)}
    if(!powod) return message.channel.send(powodbłąd);
    if(!użytkownik) return message.channel.send(użytkownikbłąd);
    var time = new Date().toLocaleString()

    const userban = mentions.users.first()

    if (userban.id === author.id) {
        const blad3 = new MessageEmbed()
        .setTitle("BAN")
        .setDescription("Nie możesz zbanować samego siebie")
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
        .setTitle("BAN")
        .setDescription("Potrzebuje więcej permisji!")
        .setColor('#ff0000')
        .setTimestamp()
        message.channel.send("", {
            content: `${message.author}`,
            embed: błąd4
          })
      return
    }
  

    const server = new MessageEmbed()
    .setTitle('BAN')
    .setDescription(`Pomyślnie zbanowano użytkownika ${użytkownik}! \n\n powód: ${powod}`)
    .setTimestamp()
    .setFooter(`${nazwa}`)
    message.channel.send("", {
        content: `${message.author}`,
        embed: server
      })

      const wiadomosclogi = new MessageEmbed()
      .setTitle("BAN")
      .setColor("#ed4245")
      .setDescription(`Użytkownik: ${użytkownik} | ${użytkownik.id} został zbanowany przez: ${message.author} \n data: ${time} \n pwoód: ${powod} `)
      .setTimestamp()
      logi.send(wiadomosclogi)

        const bandm = new MessageEmbed()
        .setTitle(`BAN`)
        .setDescription(`Zostałeś zbanowany na serwerze: **${nazwa}** przez: ${message.author} \n\n powód: ${powod}`)
        .setColor(`#ff0000`)
        .setTimestamp()
        await użytkownik.send(bandm)
  
      użytkownik.ban({days: 7, reason: powod})

    }

module.exports.help = {
    name: `ban`,
    aliases: [""]
};
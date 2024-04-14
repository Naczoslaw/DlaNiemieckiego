const { MessageEmbed } = require('discord.js')
const { nazwa, kanalwynikiwl, wlchecker, whitelistrola } = require('../../config/config');

const upr = new MessageEmbed()
.setTitle('Błąd')
.setColor("#ff0000")
.setDescription(`Nie masz rangi: <@&${wlchecker}>`)
.setFooter(`${nazwa}`);

const użytkownikbłąd = new MessageEmbed()
.setTitle('Błąd')
.setColor("#ff0000")
.setDescription('Podaj osobę która nie zdała wl')
.setFooter(`${nazwa}`);

module.exports.run = async (Client, message, args, prefix) => {

    if(!message.content.startsWith(prefix)) return;
    let użytkownik = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const { author, guild, mentions } = message
    let użytkownik2 = message.member
    const wynikwl = message.guild.channels.cache.get(kanalwynikiwl)
    let hex = args.slice(1).join(" ");
    if(!użytkownik) return message.channel.send(użytkownikbłąd);
    if(!message.member.roles.cache.has(wlchecker)){
    return message.channel.send(upr)}

    const userwl = mentions.users.first()

    if (userwl.id === author.id) {
        const blad3 = new MessageEmbed()
        .setTitle("Whitelist")
        .setDescription("Nie możesz sobie nadać WL")
        .setColor('#b30007')
        .setFooter(`${nazwa}`)
        .setTimestamp()
        message.channel.send("", {
            content: `${message.author}`,
            embed: blad3
          })
          return
      }

      const niezdane = new MessageEmbed()
      .setTitle("WHITELIST")
      .setDescription(`WL-CHECKER: ${użytkownik2}\n\n ${użytkownik}\nz przykrością informujemy, że egzaminator stwierdził że twoja rozmowa wl została niezaliczona ❌`)
      .setColor("#ff0000")
   .setThumbnail(`https://cdn.discordapp.com/attachments/1028994925615927366/1030119585204142211/unknown.png`)
      .setFooter(`${nazwa}`)
      .setTimestamp()
      wynikwl.send("", {
        embed: niezdane
      })

const serwer = new MessageEmbed()
.setTitle('Whitelist')
.setDescription(`INFORMACJA \n\n Została poprawnie wysłana`)
.setColor('#00ff00')
.setFooter(`${nazwa}`)
.setTimestamp()
      message.channel.send("", {
        content: `${użytkownik2}`,
        embed: serwer
      })

      const pv = new MessageEmbed()
      .setTitle('Whitelist - wynik')
      .setDescription(`Hej informuję cię o tym że nie zdałeś WL`)
      .setColor('#ff0000')
      .setFooter(`${nazwa}`)
      .setTimestamp()
      użytkownik.send("", {
        content: `${użytkownik}`,
        embed: pv
      })


}

module.exports.help = {
    name: `niezdane`,
    aliases: [""]
};
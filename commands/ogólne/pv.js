const { MessageEmbed } = require('discord.js')
const { MessageButton } = require("discord-buttons")
const { nazwa, dostepdm } = require('../../config/config');

const upr = new MessageEmbed()
.setTitle('DM')
.setColor("#ff0000")
.setDescription(`Nie masz rangi: <@&${dostepdm}>`)

const wiadomoscbłąd = new MessageEmbed()
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
    let wiadomosc = args.slice(1).join(" ");
    if (!wiadomosc) return message.channel.send(wiadomoscbłąd);
    if (!użytkownik) return message.channel.send(użytkownikbłąd);
    if(!message.member.roles.cache.has(dostepdm)){
      return message.channel.send(upr)}
    var time = new Date().toLocaleString()


    const userdm = mentions.users.first()

    if (userdm.id === author.id) {
        const blad3 = new MessageEmbed()
        .setTitle("DM")
        .setDescription("Nie możesz wysłać wiadomosci do samego siebie")
        .setColor('#b30007')
        .setFooter(`${nazwa}`)
        .setTimestamp()
        message.channel.send("", {
            content: `${message.author}`,
            embed: blad3
          })
          return
      }
  

const pytanie = new MessageEmbed()
    .setTitle('DM')
    .setDescription(`Czy aby napewno chcesz wysłać wiadomość DM?`)

    let button2 = new MessageButton()
    .setStyle("green")
    .setLabel("TAK")
    .setEmoji("✅")
    .setID("tak")
    //
    let button3 = new MessageButton()
    .setStyle("red")
    .setLabel("NIE")
    .setEmoji("❌")
    .setID("nie")

    message.channel.send('', {
        button: [button2, button3],
        embed: pytanie
    });

    Client.on('clickButton', async (button) => { 
        if (button.id != "tak") return
        const { guild, clicker } = button

        if(!button.clicker.member.roles.cache.has(dostepdm)){
            const brakupr = new MessageEmbed()
            .setDescription(`${button.clicker.user}, Nie masz uprawnień!`)
            .setAuthor(clicker.user.tag, button.clicker.user.displayAvatarURL({ dynamic:true }))
            .setColor("#ff0000")   
            return await button.reply.send('', { embed: brakupr, ephemeral: true })
            }

        const gotowe = new MessageEmbed().setDescription(`Wiadomosć została wysłana \n - wysłane do: ${użytkownik} \n - Wiadomość wysłał: ${message.author} \n - data: ${time}`)
        await button.reply.send('', { embed: gotowe, ephemeral: true }).catch(() => {})
    
const dm = new MessageEmbed()
    .setTitle(`DM`)
    .setDescription(`${wiadomosc}`)
    .setTimestamp()
    .setFooter(`${nazwa}`)
    użytkownik.send(dm).catch(() => {})

        button.message.delete({ timeout: 1000}).catch(() => {})

    })

    //

    Client.on('clickButton', async (button) => { 
        if (button.id != "nie") return
        const { guild, clicker } = button

        if(!button.clicker.member.roles.cache.has(dostepdm)){
            const brakupr2 = new MessageEmbed()
            .setDescription(`${button.clicker.user}, Nie masz uprawnień!`)
            .setAuthor(clicker.user.tag, button.clicker.user.displayAvatarURL({ dynamic:true }))
            .setColor("#ff0000")   
            return await button.reply.send('', { embed: brakupr2, ephemeral: true })
            }
const blad = new MessageEmbed().setDescription(`Nie wysłano wiadomości`)
        await button.reply.send('', { embed: blad, ephemeral: true }).catch(() => {})

        button.message.delete({ timeout: 1000}).catch(() => {})
    
    })
 }

module.exports.help = {
    name: `dm`,
    aliases: [""]
};
const { client } = require('../index');
const { MessageEmbed } = require("discord.js")
const { kanallogi } = require(`../config/config`)
const { MessageButton, MessageActionRow } = require("discord-buttons")



client.on('clickButton', async (button) => {

    const { guild, clicker } = button
    const user = clicker.user

    if(button.id == 'przycisk-zamknij') {

        if(button.message.channel.name.startsWith("closed-")){
            const blad = new MessageEmbed()
            .setDescription(`${user} ticket jest zamknięty!`)
            .setColor("#ff0000")

            button.reply.send('', { embed: blad, ephemeral: true })
            return 
        }
 

        const embed2 = new MessageEmbed()
        .setDescription(`${user}, chcesz więcej opcji!`)
        .setAuthor(user.tag, user.displayAvatarURL({ dynamic:true }))
        .setColor("#ff3333")

        const tak = new MessageButton()
        .setLabel("Tak")
        .setStyle("green")
        .setEmoji("✅")
        .setID("przycisk-zamknij-tak")
        //
        const nie = new MessageButton()
        .setLabel("Nie")
        .setStyle("red")
        .setEmoji("❌")
        .setID("przycisk-zamknij-nie")
    const row = new MessageActionRow()
        .addComponent(tak)
        .addComponent(nie)


        button.reply.send(``, { 
            components: [row],
            embed: embed2
        })
    } else if(button.id == 'przycisk-prowadz') {  

        if(button.message.channel.name.startsWith("closed-")){
            const blad2 = new MessageEmbed()
            .setDescription(`${user} ten ticket został zarchiwizowany, nie możesz go zamknąć!`)
            .setColor("#ff0000")

            button.reply.send('', { embed: blad2, ephemeral: true })
            return 
        }


        const kanalLogi = guild.channels.cache.get(kanallogi)
        if(!button.clicker.member.hasPermission("ADMINISTRATOR")){
          const brakupr = new MessageEmbed()
          .setDescription(`${button.clicker.user}, Nie masz uprawnień do Ticketów!`)
          .setAuthor(clicker.user.tag, button.clicker.user.displayAvatarURL({ dynamic:true }))
          .setColor("#ff0000")   
          return await button.reply.send('', { embed: brakupr, ephemeral: true })
          }

          const nazwa2 = button.message.channel.name
          await button.message.channel.setName(`claimed-${nazwa2}`)  

          const wiadomosc = new MessageEmbed()
          .setDescription(`${button.clicker.user} Ticket.`)
          .setAuthor(`${button.clicker.user.tag}`, button.clicker.user.displayAvatarURL({ dynamic:true }))
          .setColor("YELLOW")    
          await button.reply.send(wiadomosc)

          const prowadzembed = new MessageEmbed()
          .setDescription(`${user}, za chwilę zjawi się tu support!\opisz swój problem!`)
          .setFooter(`Aby zamknąć ticket kliknij 🔒!`)
          .setAuthor(`${button.clicker.user.tag}`, user.displayAvatarURL({ dynamic:true }))
          .setColor("#44fa07")

         
          const PrzyciskZamknij2 = new MessageButton()
          .setLabel("Zamknij")
          .setStyle("green")
          .setEmoji("🔒")
          .setID("przycisk-zamknij")
          
          const row = new MessageActionRow()
          .addComponent(PrzyciskZamknij2)

          const time = new Date().toLocaleString()
          const autorticketa = guild.members.cache.get(button.message.channel.topic)
          
          const LOGI = new MessageEmbed()
              .setTitle(`Użytkownik Ticketa!`)
              .setDescription(`
              \`ID ticketa:\` ${button.message.channel.id}
              \`Kanał:\` ${button.message.channel}
              \`Nazwa:\`  #${button.message.channel.name}\n
              **Dane użytkownika:**\n
              \`Nazwa:\` ${user} | ${user.tag}
              \`ID:\` ${user.id}\n
              **Dane o twórcy Ticketa:**\n
              \`Nazwa:\` ${autorticketa.user} | ${autorticketa.user.tag} | ${autorticketa.id}
              `)
              .setThumbnail(user.displayAvatarURL({ dynamic:true }))
              .setColor(`YELLOW`)
              .setFooter(`Data: ${time}`)
          kanalLogi.send(LOGI) 
          button.message.edit("", {
              embed: prowadzembed,
              components: [row]
          })
    }
})


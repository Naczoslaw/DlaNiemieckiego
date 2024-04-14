const { client } = require('../index');
const { MessageEmbed } = require("discord.js")
const { kanallogi, kategoriaarchiwum, guildid, nazwa, avatar } = require(`../config/config`)
const { MessageButton, MessageActionRow } = require("discord-buttons")
const { MessageAttachment } = require("discord.js");
const Discord = require('discord.js');

client.on('clickButton', async (button) => {
    const { guild, clicker } = button
    const user = clicker.user
    const kanalLogi = guild.channels.cache.get(kanallogi)
    if(button.id == 'przycisk-zamknij-tak') {

        const time = new Date().toLocaleString()
        const autorticketa = guild.members.cache.get(button.message.channel.topic)     
        const LOGI3 = new MessageEmbed()
        .setTitle(`Ticket został zamknięty!`)
        .setDescription(`
        \`ID ticketa:\` ${button.message.channel.id}
        \`Kanał:\` ${button.message.channel}
        \`Nazwa:\`  #${button.message.channel.name}\n
        **Dane o użytkowniku:**\n
        \`Nazwa:\` ${user} | ${user.tag}
        \`ID:\` ${user.id}\n
        **Dane o autorze Ticketa:**\n
        \`Nazwa:\` ${autorticketa.user} | ${autorticketa.user.tag}
        \`ID:\` ${autorticketa.id}
        `)
        .setThumbnail(user.displayAvatarURL({ dynamic:true }))
        .setColor(`RED`)
        .setFooter(`Data zgłoszenia: ${time}`)
    kanalLogi.send(LOGI3)

    const ticketzamknięty = new MessageEmbed()
    .setDescription(`Ten ticket został zamknięty przez: ${button.clicker.user} | ${button.clicker.user.tag}`)
    .setColor(`#ff0000`)
    .setFooter(`Data zamknięcia: ${time}`)
    button.message.channel.send(ticketzamknięty)
        
        await button.message.channel.setName(`closed-ticket-${autorticketa.user.tag}`)   

        const embed4 = new MessageEmbed()
        .setDescription(`**Ticket stworzony przez:** ${button.clicker.user}\n\n**Kliknij przycisk:\n ❌ - aby usunąć ticket.\n 🔓 - aby ponownie otworzyć ticketa. \n 📁 - aby zarchiwizować ticket.**`)
        .setAuthor(user.tag, user.displayAvatarURL({ dynamic:true }))
        .setColor("#ff3333")

        const PrzyciskUsun = new MessageButton()
        .setLabel("Usuń")
        .setStyle("red")
        .setEmoji("❌")
        .setID("przycisk-usun")
        //
        const PrzyciskReopen = new MessageButton()
        .setLabel("Reopen")
        .setStyle("gray")
        .setEmoji("🔓")
        .setID("przycisk-reopen")

        const PrzyciskArchiwizuj = new MessageButton()
        .setLabel("Archiwizuj")
        .setStyle("gray")
        .setEmoji("📁")
        .setID("przycisk-archiwizuj")

    const row = new MessageActionRow()
        .addComponent(PrzyciskUsun)
        .addComponent(PrzyciskReopen)
        .addComponent(PrzyciskArchiwizuj)
        button.message.delete()
        button.message.channel.send("", {
            embed: embed4,
            components: [row]
        })

    }    

    const embed3 = new MessageEmbed()
    .setDescription(`Anulowano usuwanie Ticketu!`)
    .setAuthor(user.tag, user.displayAvatarURL({ dynamic:true }))
    .setColor("#ff3333")
    if(button.id == 'przycisk-zamknij-nie') {
    button.message.edit("", 
    {
        embed: embed3,
        components: []
    })
    } 
    
    else if(button.id == 'przycisk-usun') {

        const embed5 = new MessageEmbed()
        .setDescription(`Czy aby na pewno chcesz usunąć tego ticketa?`)
        .setAuthor(user.tag, user.displayAvatarURL({ dynamic:true }))
        .setColor("#ff3333")

        const potwierdz = new MessageButton()
        .setLabel("Potwierdź")
        .setStyle("green")
        .setEmoji("✅")
        .setID("przycisk-usun-tak")

        const anuluj = new MessageButton()
        .setLabel("Anuluj")
        .setStyle("red")
        .setEmoji("❌")
        .setID("przycisk-usun-nie")

        const row = new MessageActionRow()
        .addComponent(potwierdz)
        .addComponent(anuluj)
        button.message.delete()
        button.message.channel.send("", {
            embed: embed5,
            components: [row]
        })
    } else if(button.id == 'przycisk-usun-tak') {

        const time = new Date().toLocaleString()
        const autorticketa = guild.members.cache.get(button.message.channel.topic)     
        const LOGI1 = new MessageEmbed()
        .setTitle(`Ticket został usunięty!`)
        .setDescription(`
        \`ID ticketa:\` ${button.message.channel.id}
        \`Kanał:\` ${button.message.channel}
        \`Nazwa:\`  #${button.message.channel.name}\n
        **Dane o użytkowniku:**\n
        \`Nazwa:\` ${user} | ${user.tag}
        \`ID:\` ${user.id}\n
        **Dane o autorze Ticketa:**\n
        \`Nazwa:\` ${autorticketa.user} | ${autorticketa.user.tag}
        \`ID:\` ${autorticketa.id}
        `)
        .setThumbnail(user.displayAvatarURL({ dynamic:true }))
        .setColor(`#ff0000`)
        .setFooter(`Data zgłoszenia: ${time}`)
    kanalLogi.send(LOGI1)

        const embed6 = new MessageEmbed()
        .setDescription(`Kanał zostanie usunięty za 1 sekundę!`)
        .setColor("#ff3333")
        button.reply.send(embed6)
        setTimeout(() => {
        button.message.channel.delete()
        }, 1000);

    } else if(button.id == 'przycisk-usun-nie') {
        
        const embed6 = new MessageEmbed()
        .setDescription(`**Ticket stworzony przez:** ${button.clicker.user}\n\n**Kliknij przycisk:\n ❌ - aby usunąć ticket.\n 🔓 - aby ponownie otworzyć ticketa.\n 📁 - aby zarchiwizować ticket.**`)
        .setAuthor(user.tag, user.displayAvatarURL({ dynamic:true }))
        .setColor("#ff3333")

        const PrzyciskUsun = new MessageButton()
        .setLabel("Usuń")
        .setStyle("red")
        .setEmoji("❌")
        .setID("przycisk-usun")
        //
        const PrzyciskReopen = new MessageButton()
        .setLabel("Reopen")
        .setStyle("gray")
        .setEmoji("🔓")
        .setID("przycisk-reopen")

        const PrzyciskArchiwizuj = new MessageButton()
        .setLabel("Archiwizuj")
        .setStyle("gray")
        .setEmoji("📁")
        .setID("przycisk-archiwizuj")

    const row = new MessageActionRow()
        .addComponent(PrzyciskUsun)
        .addComponent(PrzyciskReopen)
        .addComponent(PrzyciskArchiwizuj)
        button.message.delete()
        button.message.channel.send("", {
            embed: embed6,
            components: [row]
        })

    } else if(button.id == `przycisk-reopen`) { 
        const autorticketa = guild.members.cache.get(button.message.channel.topic) 
        const time = new Date().toLocaleString()
        const LOGI2 = new MessageEmbed()
          .setTitle(`Ticket został ponownie otworzony!`)
          .setDescription(`
          \`ID ticketa:\` ${button.message.channel.id}
          \`Kanał:\` ${button.message.channel}
          \`Nazwa:\`  #${button.message.channel.name}\n
          **Dane o użytkowniku:**\n
          \`Nazwa:\` ${user} | ${user.tag}
          \`ID:\` ${user.id}\n
          **Dane o autorze Ticketa:**\n
          \`Nazwa:\` ${autorticketa.user} | ${autorticketa.user.tag}
          \`ID:\` ${autorticketa.id}
          `)
          .setThumbnail(user.displayAvatarURL({ dynamic:true }))
          .setColor(`#00ff00`)
          .setFooter(`Data ponownego otwarcia: ${time}`)
        kanalLogi.send(LOGI2)

        const reopenembed = new MessageEmbed()
        .setColor("#00ff00")
        .setDescription(`Ticket został ponownie otwarty przez ${button.clicker.user} | ${button.clicker.user.tag}`)
        .setFooter(nazwa, avatar)
        .setTimestamp()

        button.message.channel.setName(`reopen-ticket-${autorticketa.user.tag}`) 

        button.reply.send("", { embed: reopenembed })

          

    } else if(button.id == `przycisk-transkryptuj`) {


        const time = new Date().toLocaleString()
        fetchTranscript(button.message, {
            channel: button.message.channel ,
            numberOfMessages: 99, // maksymalnie można 99
            inverseArray: true, 
            dateFormat: "MM/DD/YYYY at HH:mm:ss", 
            dateLocale: "pl", 
            customTitle: `Nazwa kanału: ${button.message.channel.name}`,
            customDescription: `Opis kanału: ${button.message.channel.topic}`, 
    
    
        }).then((data) => {
            const file = new Discord.MessageAttachment(data, `${button.message.channel.name}.html`);
            button.reply.send({files: [file]});
            
            const nowytranskrypt = new MessageEmbed()
            .setDescription(`Zrobiony przez: ${button.clicker.user} | ${button.clicker.user.tag}`)
            .setColor(`red`)
            .setFooter(`Data stworzenia: ${time}`)

            const nowytranskrypt2 = new MessageEmbed()
            .setTitle(`Transkrypt ticketu!`)
            .setDescription(`Transkrypt ticketa ${button.message.channel} | ${button.message.channel.name}`)
            .setColor(`green`)
            kanałtranskrypty.send(nowytranskrypt2)
            kanałtranskrypty.send("", { 
            files:  [file]
        }).then(sent => {
            let idwiadomosci = sent.id;
            kanałtranskrypty.send(nowytranskrypt)
            const autorticketa = guild.members.cache.get(button.message.channel.topic)     
            const logitranskrypt = new MessageEmbed()
            .setTitle(`Stworzono nowy trankrypt ticeta!`)
            .setDescription(`
            \`ID ticketa:\` ${button.message.channel.id}
            \`Kanał:\` ${button.message.channel}
            \`Nazwa:\`  #${button.message.channel.name}\n
            **Dane o użytkowniku:**\n
            \`Nazwa:\` ${user} | ${user.tag}
            \`ID:\` ${user.id}\n
            **Dane o autorze Ticketa:**\n
            \`Nazwa:\` ${autorticketa.user} | ${autorticketa.user.tag}
            \`ID:\` ${autorticketa.id}\n
            **Transkrypt:**\n
            \`Transkrypt Ticketa:\` [[Kliknij aby zobaczyć]](https://discord.com/channels/${guildid}/${kanałtranskrypty.id}/${idwiadomosci})
            `)
            .setThumbnail(user.displayAvatarURL({ dynamic:true }))
            .setColor(`#808080`)
            .setFooter(`Data stworzenia transkryptu: ${time}`)
        kanalLogi.send(logitranskrypt)
            });

        });

    } else if(button.id == `przycisk-archiwizuj`) {
        const autorticketa = guild.members.cache.get(button.message.channel.topic)  

        const embed7 = new MessageEmbed()
        .setColor("#00ff00")
        .setDescription(`Ticket został zarchiwizowany przez ${button.clicker.user} | ${button.clicker.user.tag}`)
        .setFooter(nazwa, avatar)
        .setTimestamp()

        const embed6 = new MessageEmbed()
        .setDescription(`**Ticket stworzony przez:** ${button.clicker.user}\n\n**Kliknij przycisk:\n ❌ - aby usunąć ticket.\n 🔓 - aby ponownie otworzyć ticketa. \n 📁 - aby zarchiwizować ticket.**`)
        .setAuthor(user.tag, user.displayAvatarURL({ dynamic:true }))
        .setColor("#ff3333")

        const PrzyciskUsun = new MessageButton()
        .setLabel("Usuń")
        .setStyle("red")
        .setEmoji("❌")
        .setID("przycisk-usun")
        .setDisabled()

        const PrzyciskReopen = new MessageButton()
        .setLabel("Reopen")
        .setStyle("gray")
        .setEmoji("🔓")
        .setID("przycisk-reopen")
        .setDisabled()

        const PrzyciskArchiwizuj = new MessageButton()
        .setLabel("Archiwizuj")
        .setStyle("gray")
        .setEmoji("📁")
        .setID("przycisk-archiwizuj")
        .setDisabled()

    const row = new MessageActionRow()
        .addComponent(PrzyciskUsun)
        .addComponent(PrzyciskReopen)
        .addComponent(PrzyciskArchiwizuj)
        button.message.edit("", {
            embed: embed6,
            components: [row]
        })

        button.reply.send(embed7)

        button.message.channel.setParent(`${kategoriaarchiwum}`)

        const time = new Date().toLocaleString()
        const archiwizacjaticketa = new MessageEmbed()
        .setTitle(`Zarchiwizowano Ticket!`)
        .setDescription(`
        \`ID ticketa:\` ${button.message.channel.id}
        \`Kanał:\` ${button.message.channel}
        \`Nazwa:\`  #${button.message.channel.name}\n
        **Dane o użytkowniku:**\n
        \`Nazwa:\` ${user} | ${user.tag}
        \`ID:\` ${user.id}\n
        **Dane o autorze Ticketa:**\n
        \`Nazwa:\` ${autorticketa.user} | ${autorticketa.user.tag}
        \`ID:\` ${autorticketa.id}\n`)
        .setThumbnail(user.displayAvatarURL({ dynamic:true }))
        .setColor(`#808080`)
        .setFooter(`Data zarchiwizowania ticketu: ${time}`)
        kanalLogi.send(archiwizacjaticketa)
    }
})
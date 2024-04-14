const {client} = require('../index');
const Discord = require("discord.js");
const config = require("../config/config")
const { MessageEmbed } = require('discord.js')
const { MessageButton, MessageActionRow } = require("discord-buttons")

client.on("message", async (message) => {
    if(message.author.bot) return
    if(message.channel.type == `dm`) return

    const { guild } = message
    const { nazwa, avatar, kanaladminpodania } = require(`../config/config`)
    const listakanalowpodan = require(`../dodatki/listakanałówypodań.json`).id
    const kanaladmin = guild.channels.cache.get(`${kanaladminpodania}`)

    if(listakanalowpodan.join().includes(`${message.channel.id}`)){   
        let trescpodania = message.content, dodatkowawiadomosc = false
        if(trescpodania.length >= 1800) {
            trescpodania = "\`Treść podania w następnej wiadomości!\`"
            dodatkowawiadomosc = true
        }
        let zalacznik
        const embed = new MessageEmbed().setAuthor(nazwa, avatar)
        .setTitle(`Podanie!`).setFooter(`${message.author.id}`)
        .setColor(`#06adeb`).setTimestamp()
        .setThumbnail(`${message.author.displayAvatarURL({ dynamic:true })}`)
        .setDescription(`*Autor podania:* ${message.author} | ${message.author.tag} | ${message.author.id}\n 
        *Kanał podania:* ${message.channel} | ${message.channel.name} | ${message.channel.id} \n
        *Treść podania:*\n\n${trescpodania}\n`)
        if(message.attachments.find(u => u)){
            zalacznik = message.attachments.first()
        };
        
        const PrzyciskAkceptuj = new MessageButton()
            .setLabel("")
            .setStyle("green")
            .setEmoji("✅")
            .setID("przycisk-akceptuj")
        const PrzyciskOdrzuc = new MessageButton()
            .setLabel("")
            .setStyle("red")
            .setEmoji("❌")
            .setID("przycisk-odrzuc")
        const PrzyciskIgnoruj = new MessageButton()
            .setLabel("Ignoruj Podanie")
            .setStyle("grey")
            .setEmoji("➖")
            .setID("przycisk-ignoruj")
        const row = new MessageActionRow()
            .addComponent(PrzyciskAkceptuj)
            .addComponent(PrzyciskOdrzuc)

        await kanaladmin.send({
            components: [row],
            embed: embed
        })
        if(dodatkowawiadomosc){
            kanaladmin.send(new MessageEmbed()
            .setDescription(`*Treść podania:*\n${message.content}`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true }))
            .setColor("#404040"))
        }
        if(zalacznik){
            await kanaladmin.send(zalacznik)
            kanaladmin.send(new MessageEmbed()
            .setFooter(`Załącznik do podania użytkownika ${message.author.tag}`, message.author.displayAvatarURL({ dynamic:true }))
            .setColor("#404040"))
        }
        message.delete()

        const embed1 = new MessageEmbed()
            .setDescription(`Twoje podanie za jakiś czas zostanie rozpatrzone, czekaj na wiadomość!`)
            .setColor(`#1b06eb`)
            .setTimestamp()
            message.author.send(embed1).catch(() => {})
    } else return
   })
const {client} = require('../index');
const Discord = require("discord.js");
const config = require("../config/config");
const { MessageEmbed } = require("discord.js");     

        client.on('clickButton', async (button, message) => {
            if (!button.id.startsWith(`przycisk-`)) return
            const { guild, clicker } = button
            const { user } = clicker
            const { kanalwynikipodania } = require(`../config/config`)
            const kanalwyniki = guild.channels.cache.get(kanalwynikipodania)
            
            if(button.id == "przycisk-akceptuj"){
                const uzytkownik = guild.members.cache.get(`${button.message.embeds[0].footer.text}`).user
                const embedold = button.message.embeds[0]
                const matches = button.message.embeds[0].description.match(/\<#\d+/)
                const kanałpodanie = matches[0] + ">"
                if(!uzytkownik){
                    const embed = new MessageEmbed()
                    .setDescription(`${user}, wystąpił błąd podczas potwierdzania podania!`)
                    .setFooter("Użytkownik nie znajduje się na serwerze!")
                    .setColor(`#ed4245`)
                    await button.reply.send({ embed: embed, ephemeral: true })
                    return
                }

                const embed = new MessageEmbed().setDescription(`twoje podanie na ${kanałpodanie} zostało rozpatrzone pozytywnie!`).setColor(`#00ff15`).setTimestamp()
kanalwyniki.send("", {
                content: `${uzytkownik}`,
                embed: embed
              })
                embed.setDescription(`${uzytkownik}, twoje podanie na ${kanałpodanie} zostało rozpatrzone pozytywnie przez ${user}!`)
                embed.setTimestamp()
                uzytkownik.send(embed).catch(() => {})
                const newembed = new MessageEmbed()
                    .setTitle(`Rozpatrzone pozytywnie!`)
                    .setDescription(embedold.description)
                    .setColor(`#00ff15`)
                    .addField(`\u200B`,`\u200B`)
                    .addField(`podanie sprawdził`, `${user.tag}`)
                    .setThumbnail(embedold.thumbnail.url)
                    .setFooter(embedold.footer.text)
                    if(embedold.fields.length > 0){
                        newembed.addField(embedold.fields[0].name, embedold.fields[0].value)
                    }
                button.message.edit({
                    components: [],
                    embed: newembed
                })
            } else if(button.id == "przycisk-odrzuc"){
                const uzytkownik = guild.members.cache.get(`${button.message.embeds[0].footer.text}`).user
                const embedold = button.message.embeds[0]
                if(!uzytkownik){
                    const embed = new MessageEmbed()
                    .setDescription(`${user}, powstał błąd podczas potwierdzania podania!`)
                    .setFooter("Użytkownik nie znajduje się na serwerze!")
                    .setColor(`#ed4245`)
                    await button.reply.send({ embed: embed, ephemeral: true })
                    return
                }
                const matches = button.message.embeds[0].description.match(/\<#\d+/)
                const kanałpodanie = matches[0] + ">"
                const embed = new MessageEmbed()
                .setDescription(`twoje podanie na ${kanałpodanie} zostało rozpatrzone negatywnie!`)
                .setColor(`#ff0000`).setTimestamp()
                kanalwyniki.send("", {
                content: `${uzytkownik}`,
                embed: embed
              })
                embed.setDescription(`${uzytkownik}, twoje podanie na ${kanałpodanie} zostało rozpatrzone negatywnie przez ${user}!`)
                embed.setTimestamp()
                uzytkownik.send(embed).catch(() => {})
                const newembed = new MessageEmbed()
                    .setTitle(`Podanie rozpatrzone negatywnie!`)
                    .setDescription(embedold.description)
                    .setColor(`#ff0000`)
                    .addField(`\u200B`,`\u200B`)
                    .addField(`podanie sprawdził`, `${user.tag} | ${user.tag}`)
                    .setThumbnail(embedold.thumbnail.url)
                    .setFooter(embedold.footer.text)
                    if(embedold.fields.length > 0){
                        newembed.addField(embedold.fields[0].name, embedold.fields[0].value)
                    }
                button.message.edit({
                    components: [],
                    embed: newembed
                })
            } else if(button.id == "przycisk-ignoruj") {
                const embedold = button.message.embeds[0]
                const newembed = new MessageEmbed()
                    .setTitle(`Podanie zignorowane!`)
                    .setDescription(embedold.description)
                    .setColor(`#23272A`)
                    .addField(`\u200B`,`\u200B`)
                    .addField(`zignorowane przez`, `${user.tag}`)
                    .setThumbnail(embedold.thumbnail.url)
                    .setAuthor(avatar)
                    .setFooter(embedold.footer.text)
                    if(embedold.fields.length > 0){
                        newembed.addField(embedold.fields[0].name, embedold.fields[0].value)
                    }
                button.message.edit({
                    components: [],
                    embed: newembed
                })
            }    
        })
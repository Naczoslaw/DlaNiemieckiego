const { client } = require('../index');
const { MessageEmbed } = require("discord.js")
const { kanallogi, kategoriaticket, limitticketów } = require(`../config/config`)
const { MessageButton, MessageActionRow } = require("discord-buttons")


client.on('clickButton', async (button) => {
    if (button.id != "Ticket") return
    const { guild, clicker } = button
    const user = clicker.user
    const KategoriaTicket = guild.channels.cache.get(kategoriaticket)
    const kanalLogi = guild.channels.cache.get(kanallogi)
    //
    let i = 0
    KategoriaTicket.children.forEach(kanal => {
        if(kanal.topic == user.id && !kanal.name.includes("closed")){
            i++
        }
    })
    //
    if (i >= limitticketów){
        const embed = new MessageEmbed().setDescription(`${user} limit został wyczerpany! (${i}/${limitticketów})`).setColor(`#ff0000`)
        await button.reply.send('', { embed: embed, ephemeral: true })
        return
    }
    //
    const nazwa = `ticket-${button.clicker.user.tag}`
    const nowykanal = await guild.channels.create(nazwa, {
        type: 'text',
        permissionOverwrites: [
           {
             id: guild.roles.everyone.id,
             deny: [`VIEW_CHANNEL`],
          },
        ],
        parent: `${kategoriaticket}`,
        topic: `${user.id}`
      })
    //
    await nowykanal.updateOverwrite(user, {ADD_REACTIONS: true,VIEW_CHANNEL: true,SEND_MESSAGES: true,EMBED_LINKS: true,ATTACH_FILES: true,READ_MESSAGE_HISTORY: true})
    //
    KategoriaTicket.permissionOverwrites.forEach(async permisjaKategoria => {
        const type = permisjaKategoria.type == "role" ? guild.roles.cache.get(permisjaKategoria.id) : guild.members.cache.get(permisjaKategoria.id)
        if(type) {
            const permisje = new Object
            permisjaKategoria.allow.toArray().forEach(permisja => {
                permisje[permisja] = true
            })
            permisjaKategoria.deny.toArray().forEach(permisja => {
                permisje[permisja] = false
            })
            await nowykanal.updateOverwrite(type, permisje)
        }
    })
    //
    const embed_reply = new MessageEmbed().setColor("#00ff00").setDescription(`${user} ticket został stworzony \n kanał: ${nowykanal}`)
    await button.reply.send('', { embed: embed_reply, ephemeral: true })
    //

            //
            const PrzyciskZamknij = new MessageButton()
            .setLabel("Zamknij ticket.")
            .setStyle("green")
            .setEmoji("🔒")
            .setID("przycisk-zamknij")
//
        const row = new MessageActionRow()
            .addComponent(PrzyciskZamknij)
            //


//const embed132 = new MessageEmbed()
	  //.setTitle(`Just-License Współpracuje z VG-MG cloud`)
      //.setDescription(`Jeśli szukasz bardzo dobrego hostingu wbij na discord: https://discord.gg/6DXvXkRBDX`)
      //.setColor("#0973a2")
//nowykanal.send(embed132)
    
    const embed = new MessageEmbed()
      .setDescription(`opisz co byś chciał w swoim bocie!`)
      .setFooter(`Aby zamknąć ticket kliknij 🔒!`)
      .setAuthor(user.tag, user.displayAvatarURL({ dynamic:true }))
      .setColor("#3406eb")
              await nowykanal.send("", {
                content: `Witaj <@${user.id}>`,
                components: [row],
                embed: embed
              })

    const time = new Date().toLocaleString()
    const embed1 = new MessageEmbed()
        .setTitle(`nowy ticket!`)
        .setDescription(`
        \`ID ticketa:\` ${nowykanal.id}\n
        **Dane użytkownika:**
        \`Nazwa:\` ${user} | ${user.tag}
        \`ID:\` ${user.id}
        `)
        .setThumbnail(user.displayAvatarURL({ dynamic:true }))
        .setColor(`#2106eb`)
        .setFooter(`Data: ${time}`)
    kanalLogi.send(embed1)

})
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const { MessageMenuOption, MessageMenu } = require("discord-buttons")
const { client } = require('../index');

client.on("clickMenu", (menu) => {

    if (menu.id != "select-role") return
        if(menu.values[0] == "-") return menu.reply.defer()
        const { guild, clicker } = menu
        const { listaidrolmenu, nazwa } = require("../config/config")
        const role = []
        listaidrolmenu.forEach(ID => {
            const rola = guild.roles.cache.get(ID)
            role.push(rola)
        })
        //
        if(role.length != listaidrolmenu.length) {
            const embed = new MessageEmbed().setColor("#ed4245").setDescription(`${clicker.user} powstał błąd podczas wyszukiwania ról, zgłoś go do Administracji aby przyśpieszyć nadanie Ci roli!`)
            return menu.reply.send('', { embed: embed, ephemeral: true })
        }
        //
        let dodana, zabrana
        if(clicker.member._roles.includes(listaidrolmenu[menu.values[0]])){
            clicker.member.roles.remove(role[menu.values[0]])
            zabrana = role[menu.values[0]].id
        } else {
            clicker.member.roles.add(role[menu.values[0]])
            dodana = role[menu.values[0]].id
        }
        //
        if(!dodana && !zabrana) {
            const embed = new MessageEmbed().setColor("#ed4245").setDescription(`${clicker.user} nie nadano, ani zabrano Ci żadnych ról, jeśli twierdzisz, że to błąd zgłoś go do Administracji!`)
            return menu.reply.send('', { embed: embed, ephemeral: true })
        }
        //
        let opis = "-", roleUzytkownika = []
        clicker.member.roles.cache.forEach(rola => {
            if(rola.id != guild.roles.everyone.id) {
                roleUzytkownika.push(rola.name)
            }
        })
        if(dodana) opis = `${clicker.user}, nadano rolę <@&${dodana}>`
        if(zabrana) opis = `${clicker.user}, usunięto rolę <@&${zabrana}>`
        const embed = new MessageEmbed().setColor(dodana ? "#3ba55c" : "#ed4245")
        .setDescription(opis)
        menu.reply.send('', { embed: embed, ephemeral: true })
   })
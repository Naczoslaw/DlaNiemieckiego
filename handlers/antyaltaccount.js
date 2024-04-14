const config = require("../config/config");
const Discord = require('discord.js');
const { client } = require('../index');
const { MessageEmbed } = require("discord.js")
const { roznicadni, kanallogi } = require(`../config/config`)

client.on('guildMemberAdd', member => {
 
        const logi = client.channels.cache.get(kanallogi)
        const TimeStart = Date.now()

        const msToSek = (ms) => {
            const m = Math.floor(ms / 60000)
            const s = ((ms % 60000) / 1000).toFixed(0)
            return `${m == 0 ? "" : `\`${m}\` ${minTxt(m)} i`} \`${s}\` ${sekTxt(s)}`
        }
        function minTxt(i) {
            if(i == 1){
                return "minutę"
            } else if(i > 1 && i < 5){
                return "minuty"
            } else return "minut"
        }
        function sekTxt(i) {
            if(i == 1){
                return "sekundę"
            } else if(i > 1 && i < 5){
                return "sekundy"
            } else return "sekund"
        }
        function dniTxt(i) {
            if(i == 1){
                return "dzień"
            } else return "dni"
        }


        const roznica = TimeStart - member.user.createdTimestamp
        const roznicaStworzenie = Math.floor((TimeStart - member.user.createdTimestamp)/1000/60/60/24)
        if(roznica/1000/60/60/24 < roznicadni){
            const brakujacedni = Math.ceil(roznicadni - roznica/1000/60/60/24)
        member.kick(member.user).catch(() => {})
        //
        //
        const embeddm = new MessageEmbed()
            .setColor("#ff0000")
            .setDescription(`twoje konto nie spełnia wymagań do dołączenia na serwer, brakuje ci **${brakujacedni}** ${dniTxt(brakujacedni)} abyś mógł być członkiem tego serwera!`)
             member.send("", {
                content: `${member.user}`,
                embed: embeddm
              }).catch(() => {})

            const embedLogi = new MessageEmbed()
.setColor("#ff0000")
.setDescription(`Użytkownik ${member.user.tag} | ${member.user.id} nie spełnia wymagań do dołączenia na serwer! Brakuje mu jeszcze **${brakujacedni}** ${dniTxt(brakujacedni)} aby mógł dołączyć na serwer!`)
.setFooter(`Konto stworzone: ${new Date(member.user.createdTimestamp).toLocaleString("pl-PL", { hour12: false })} ${roznicaStworzenie} ${dniTxt(roznicaStworzenie)} temu`)
                .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic:true }))
            logi.send(embedLogi)
        }
    })
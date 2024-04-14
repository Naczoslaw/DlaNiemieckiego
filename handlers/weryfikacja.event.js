const config = require("../config/config");
const Discord = require('discord.js');
const { client } = require('../index');
const { MessageEmbed } = require('discord.js');
const { MessageButton, MessageActionRow } = require("discord-buttons")
const { nazwa, avatar, ZweryfikowanyRola, kanallogi } = require('../config/config')

client.on('clickButton', async (button) => {
    const { MessageEmbed } = require("discord.js")
	const { guild, clicker } = button
	const logi = guild.channels.cache.get(kanallogi)
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

    const Weryfikacja = new MessageEmbed()
    .setDescription(`${clicker.user}, Zostałeś zweryfikowany!`)
    .setColor('GREEN')
    .setTimestamp();

    if (button.id == 'Weryfikacja') {
        if(clicker.member._roles.includes(`${ZweryfikowanyRola}`)) {
            const embed = new MessageEmbed()
            .setColor(`#ff0000`)
            .setDescription(`${clicker.user}, już jesteś zweryfikowany!`)
            .setTimestamp()
            await button.reply.send({ embed: embed, ephemeral: true });
        } else if (button.id == 'Weryfikacja') {
            button.reply.send(Weryfikacja, true)
            const role = button.guild.roles.cache.get(ZweryfikowanyRola)
            const member = button.clicker.member
            await member.roles.add(role)

let roznicaDołączenie = TimeStart - clicker.member.joinedTimestamp
    const roznicaStworzenie = Math.floor((TimeStart - clicker.user.createdTimestamp)/1000/60/60/24)
    if(roznicaDołączenie < 1000) roznicaDołączenie = 1000

        const Logi = new MessageEmbed().setColor("#00ff00")
        .setDescription(`Użytkownik ${clicker.user} | ${clicker.user.tag} | ${clicker.user.id} \n został pomyślnie zweryfikowany`)
        .setFooter(`Konto stworzone: ${new Date(clicker.user.createdTimestamp).toLocaleString("pl-PL", { hour12: false })} (${roznicaStworzenie} ${dniTxt(roznicaStworzenie)} temu)`)
        .setThumbnail(clicker.user.displayAvatarURL({ dynamic:true }))
        .setAuthor(`${nazwa}`, avatar)
    	logi.send(Logi)
    
        }
    }
});
    
    
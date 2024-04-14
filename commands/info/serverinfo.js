const discord = require('discord.js');

module.exports.run = async (Client, message, args, prefix) => {

    if(!message.content.startsWith(prefix)) return;

    const { MessageEmbed } = require('discord.js');
    const moment = require('moment');
    
    const poziomweryfikacji = {
        NONE: 'Brak',
        LOW: 'Mały',
        MEDIUM: 'Średni',
        HIGH: 'Duży',
        VERY_HIGH: 'Bardzo duży'
    };
    
    const TimeStart = Date.now()
    //
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
    
    let roznicaJoin = TimeStart - message.guild.createdTimestamp
    const roznicaStworzenie = Math.floor((TimeStart - message.guild.createdTimestamp)/1000/60/60/24)
    if(roznicaJoin < 1000) roznicaJoin = 1000

            let role = message.guild.roles.cache.map(x => x).filter(z => z.name !== "@everyone").join(", ");
            const osoby = message.guild.members.cache;
            const Kanały = message.guild.channels.cache;
            const emojis = message.guild.emojis.cache;
    
            const embed = new MessageEmbed()
                .setDescription(``)
                .setColor('GREEN')
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .addField('**Informacje o serwerze**', [
                    `**Nazwa:** ${message.guild.name}`,
                    `**ID:** ${message.guild.id}`,
                    `**Właściciel serwera:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
                    `**Poziom boostu:** ${message.guild.premiumTier ? `Poziom ${message.guild.premiumTier}` : 'Brak'}`,
                    `**Poziom weryfikacji:** ${poziomweryfikacji[message.guild.verificationLevel]}`,
                    `**Data stworzenia:** ${new Date(message.guild.createdTimestamp).toLocaleString("pl-PL", { hour12: false })} (${roznicaStworzenie} ${dniTxt(roznicaStworzenie)} temu)`,
                ])
                .addField('Statystyki', [
                    `**Liczba emoji:** ${emojis.size}`,
                    `**Liczba zwyklych emoji** ${emojis.filter(emoji => !emoji.animated).size}`,
                    `**Liczba animowanych emoji:** ${emojis.filter(emoji => emoji.animated).size}`,
                    `**Liczba osób:** ${message.guild.memberCount}`,
                    `**Osoby bez botów:** ${osoby.filter(member => !member.user.bot).size}`,
                    `**Boty:** ${osoby.filter(member => member.user.bot).size}`,
                    `**Kanały Tekstowe:** ${Kanały.filter(channel => channel.type === 'text').size}`,
                    `**Kanały Głosowe:** ${Kanały.filter(channel => channel.type === 'voice').size}`,
                    `**Ilośc boostów:** ${message.guild.premiumSubscriptionCount || '0'}`,
                    '\u200b'
                ])
                .addField('Aktywność', [
                    `**<:Online:890935925947908106> Dostępny:** ${osoby.filter(member => member.presence.status === 'online').size}`,
                    `**<:Idle:890936595740504064> Zaraz Wracam:** ${osoby.filter(member => member.presence.status === 'idle').size}`,
                    `**<:DND:890936414957629470> Nie przeszkadzać:** ${osoby.filter(member => member.presence.status === 'dnd').size}`,
                    `**<:Offline:890936285676580874> Niewidzoczny:** ${osoby.filter(member => member.presence.status === 'offline').size}`,
                    '\u200b'
                ])
                .setTimestamp();
                message.channel.send(embed);
}

module.exports.help = {
    name: `serverinfo`,
    aliases: [""]
};
const { MessageEmbed, PermissionOverwrites, Permissions } = require('discord.js');
const moment = require('moment');
const { nazwa, avatar } = require('../../config/config');
require('moment-duration-format');

module.exports.run = async (Client, message, args, prefix) => {
    
    if(!message.content.startsWith(prefix)) return;
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
    let status2;
    let status = user.presence.status
    let role = user.roles.cache.map(x => x).filter(z => z.name !== "@everyone").join(", ");
    let banupr = user.bannable
    let kickupr = user.kickable
    let meneageupr = user.manageable
    let nick = user.nickname
    let uprawnienia = [];

    if(user.hasPermission("KICK_MEMBERS")){
        uprawnienia.push("Wyrzucanie użytkowników")
    }
    
    if(user.hasPermission("BAN_MEMBERS")){
        uprawnienia.push("Banowanie użytkowników");
    }
    
    if(user.hasPermission("ADMINISTRATOR")){
        uprawnienia.push("Administrator");
    }

    if(user.hasPermission("MANAGE_MESSAGES")){
        uprawnienia.push("Zarządzanie wiadomościami");
    }
    
    if(user.hasPermission("MANAGE_CHANNELS")){
        uprawnienia.push("Zarządzanie kanałami");
    }

    if(user.hasPermission("MANAGE_NICKNAMES")){
        uprawnienia.push("Zarządzanie pseudonimami");
    }

    if(user.hasPermission("MANAGE_ROLES")){
        uprawnienia.push("Zarządzanie rolami");
    }

    if(user.hasPermission("MANAGE_WEBHOOKS")){
        uprawnienia.push("Zarządzanie webhookami");
    }

    if(user.hasPermission("MANAGE_EMOJIS")){
        uprawnienia.push("Zarządzanie emoji");
    }

    if(uprawnienia.length == 0){
        uprawnienia.push("Brak uprawnień");
    }
    

    if (!nick) {
        nick = "Brak"
    }
    
    
    if (!role) {
        role = "Brak"
    }

    if (role.length > 1000) {
        role = "Użytkownik posiada zbyt dużo ról, nie mogłem ich pokazać"
    }
    if (status === "online") status2 = `🟢 Dostępny `
    if (status === "offline") status2 = `⚫ Niewidoczny `
    if (status === "idle") status2 = `🟡 Zaraz wrazam `
    if (status === "dnd") status2 = `🔴 Nie przeszkadzać `

    let nitroOdznaka = user.user.avatarURL({ dynamic: true })
    let odznaki = user.user.flags.toArray().join(``)

    if (!odznaki) {
        odznaki = "**•** Użytkownik nie ma odznak"
    }

    odznaki = odznaki.replace("HOUSE_BRAVERY", "• <:hypesquadbravery:891009284471672933> \`HypeSquad Bravery\`")
    odznaki = odznaki.replace("EARLY_SUPPORTER", "• <a:nitro:740923343548579890> \`Early Supporter\`")
    odznaki = odznaki.replace("EARLY_VERIFIED_DEVELOPER", "• <:blurple_verified_bot_developer:891010268728033300>  \`Verified Bot Developer\`")
    odznaki = odznaki.replace("HOUSE_BRILLIANCE", "• <:brilliance:891009004778688582> \`HypeSquad Brilliance\`")
    odznaki = odznaki.replace("HOUSE_BALANCE", "• <:discord_balance:891009471445352528>  \`HypeSquad Balance\`")
    odznaki = odznaki.replace("DISCORD_PARTNER", "• <:blurple_partner:891009624436785185>  \`Partner\`")
    odznaki = odznaki.replace("HYPESQUAD_EVENTS", "• <a:hypesquad:755471122430034060>\`Hypesquad Event\`")
    odznaki = odznaki.replace("DISCORD_CLASSIC", "• <:DiscordNitro:891009828854583316> \`Discord Classic\`")

    if (nitroOdznaka.includes("gif")) {
        odznaki = odznaki + `
    • <a:nitro_boost:890941229406228480>   \`Nitro\``
    }

    let stat = user.presence.activities[0]
    let aktywność

    if (user.presence.activities.some(r => r.name === "Spotify")) {
        aktywność = "Słucha Spotify"
    } else if (stat && stat.name !== "Własny status") {
        aktywność = stat.name
    } else {
        aktywność = "Brak"
    }

    if (user.presence.activities.some(r => r.name !== "Spotify") && stat && stat.state !== null) {
        stat = stat.state
    } else {
        stat = "Brak"
    }

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
    
    let roznicaJoin = TimeStart - user.joinedTimestamp
    const roznicaStworzenie = Math.floor((TimeStart - user.user.createdTimestamp)/1000/60/60/24)
    if(roznicaJoin < 1000) roznicaJoin = 1000
    
    let roznicaDol = TimeStart - user.user.joinedAt
    const roznicaDołączenie = Math.floor((TimeStart - user.joinedAt)/1000/60/60/24)
    if(roznicaDol < 1000) roznicaDol = 1000

    const informacje = new MessageEmbed()
    .setColor("#00ffd5")
    .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
    .setDescription(`
    **Nick:** \n ${user} | ${user.user.tag} 
    **konto od:** \n ${new Date(user.user.createdTimestamp).toLocaleString("pl-PL", { hour12: false })} (${roznicaStworzenie} ${dniTxt(roznicaStworzenie)} temu)
    **ID:** \n ${user.id}
    **Nick:** \n ${nick}
    **Czy jest Botem:** \n ${user.user.bot ? 'Tak' : 'Nie'}
    **Avatar:** \n [[Kliknij aby zobaczyć]](${user.user.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 })})
    **Data dołączenia na serwer:** \n ${new Date(user.joinedAt).toLocaleString("pl-PL", { hour12: false })} (${roznicaDołączenie} ${dniTxt(roznicaDołączenie)} temu)
    **Aktywność:** \n ${aktywność}
    **Status:** ${status2}
    **Role użytkownika:** \n
    ${role}
    **Uprawnienia:** \n
    ${uprawnienia.join(", ")}
    **Inne**
    \`Bot może zarządzać?:\` ${meneageupr? 'Tak' : 'Nie'}
    \`Bot może zbanować?:\` ${banupr? 'Tak' : 'Nie'}
    \`Bot może wyrzucić?:\` ${kickupr? 'Tak' : 'Nie'}
    `)
    .setThumbnail(user.user.avatarURL({ dynamic: true }))
    .setTimestamp()
    .setFooter(nazwa, avatar)
    message.channel.send(informacje)
}

module.exports.help = {
    name: `userinfo`,
    aliases: [""]
};
const { MessageEmbed } = require('discord.js')
const ms = require('ms');
const { nazwa} = require(`../../config/config`)
const Discord = require('discord.js');

const błąd = new Discord.MessageEmbed()
.setTitle('Błąd')
.setColor("#ff0000")
.setDescription('Podaj poprawne ID')

const błąd2 = new Discord.MessageEmbed()
.setTitle('Błąd')
.setColor("#ff0000")
.setDescription('Ten konkurs już jest zakończony!')

module.exports.run = async (Client, message, args, prefix) => {

    const upr = new Discord.MessageEmbed()
    .setTitle('Błąd')
    .setColor("#ff0000")
    .setDescription('Nie masz uprawnień')
    if(!message.content.startsWith(prefix)) return;

    if(!message.member.hasPermission("CONNECT")){
        return message.lineReplyNoMention(upr)
    }
    if(!args[0]){
        return message.lineReplyNoMention(błąd);
    }

    let giveaway = 
    Client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    Client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);
    if(!giveaway){
        const błąd3 = new Discord.MessageEmbed()
    .setTitle('Błąd')
    .setColor("#ff0000")
    .setDescription('📛 Nie mogłem znaleźć konkursu dla `' + args.join(' ') + '`.')
        return message.lineReplyNoMention(błąd3);
    }
    Client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
    .then(() => {
        const sukces = new Discord.MessageEmbed()
        .setTitle('Sukces')
        .setColor("#00ff00")
        .setDescription('Konkurs zostanie zakończony za mniej niż '+(Client.giveawaysManager.options.updateCountdownEvery/1000)+' sekundy!')

        message.lineReplyNoMention(sukces);
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway z identyfikatorem ${giveaway.messageID} już się skończył.`)){
            message.lineReplyNoMention(błąd2);
        } else {
            console.error(e);
            message.lineReplyNoMention('Wystąpił błąd');
        }
    });
}

module.exports.help = {
    name: `giveawayend`,
    aliases: ["end"]
};
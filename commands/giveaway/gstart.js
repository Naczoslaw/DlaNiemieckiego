const { MessageEmbed } = require('discord.js')
const ms = require('ms');
const { nazwa, everyoneMention, hostedBy } = require(`../../config/config`)
const Discord = require('discord.js');


const błąd = new Discord.MessageEmbed()
.setTitle('Błąd')
.setColor("#ff0000")
.setDescription('Musisz oznaczyć kanał!')

const błąd2 = new Discord.MessageEmbed()
.setTitle('Błąd')
.setColor("#ff0000")
.setDescription('Musisz podać czas trwania konursu!')

const błąd3 = new Discord.MessageEmbed()
.setTitle('Błąd')
.setColor("#ff0000")
.setDescription('Musisz podać liczbę zwycięzców!')

const błąd4 = new Discord.MessageEmbed()
.setTitle('Błąd')
.setColor("#ff0000")
.setDescription('Musisz podać poprawną nagrodę!')


module.exports.run = async (Client, message, args, prefix) => {

    const upr = new Discord.MessageEmbed()
    .setTitle('Błąd')
    .setColor("#ff0000")
    .setDescription('Nie masz uprawnień')

    if(!message.content.startsWith(prefix)) return;

    if(!message.member.hasPermission("CONNECT")){
        return message.lineReplyNoMention(upr)
    }
    
      const kanałgiveaway = message.mentions.channels.first();
      if (!kanałgiveaway) {
        return message.lineReplyNoMention(błąd);
      }

    
      const czaskonkursu = args[1];
      if (!czaskonkursu || isNaN(ms(czaskonkursu))) {
        return message.lineReplyNoMention(błąd2);
      }
    
      const wygrani = args[2];
      if (isNaN(wygrani) || parseInt(wygrani) <= 0) {
        return message.lineReplyNoMention(błąd3);
      }
    
      const giveawaynagorda = args.slice(3).join(" ");
      if (!giveawaynagorda) {
        return message.lineReplyNoMention(błąd4);
      }
    
      Client.giveawaysManager.start(kanałgiveaway, {
        time: ms(czaskonkursu),
        prize: giveawaynagorda,
        winnerCount: parseInt(wygrani),
        hostedBy: hostedBy ? message.author : null,
    
        messages: {
          giveaway: `${
            everyoneMention ? "@everyone\n\n" : ""
          }`,
          giveawayEnded: `${
            everyoneMention ? "@everyone\n\n" : ""
          }`,
          timeRemaining: "Pozostały czas: **{duration}**!",
          inviteToParticipate: "Kliknij 🎉 aby wziąć udział!",
          winMessage: "**🎉 Gratulacje!**, {winners}! Wygrałeś: **{prize}**!",
          embedFooter: ``,
          noWinner: "anulowany Giveaway",
          hostedBy: "Twórca: {user}",
          winners: "Wygrany(ni)",
          endedAt: "zkończony Giveaway",
          units: {
            seconds: "sekund",
            minutes: "minut",
            hours: "godzin",
            days: "dni",
            pluralS: false 
          }
        }
      });
    

const embedstart = new Discord.MessageEmbed()
.setTitle('✅ Giveaway ✅')
.setColor("#02ff00")
.setDescription(`Giveaway został rozpoczęty na kanale: ${kanałgiveaway}!`)

message.lineReplyNoMention("", {
                content: `${message.author}`,
                embed: embedstart
              })
      }

module.exports.help = {
    name: `giveaway`,
    aliases: [""]
};
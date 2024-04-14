const { MessageEmbed } = require("discord.js")
const { MessageButton } = require("discord-buttons")
const {nazwa, avatar} = require(`../../config/config`)


module.exports.run = async (Client, message, args, prefix,) => {

    if(!message.content.startsWith(prefix)) return;

    const upr = new MessageEmbed()
    .setTitle('Błąd')
    .setColor("#0c0d0d")
    .setDescription('Nie masz uprawnień')
    
    if(!message.member.hasPermission("ADMINISTRATOR")){
        return message.lineReplyNoMention(upr)
      }


      //
      let button = new MessageButton()
          .setStyle('green')
          .setLabel("ticket")
          .setEmoji("📩")
          .setID("Ticket")

      const embed1 = new MessageEmbed()
          .setDescription('Kliknij w przycisk aby otworzyć ticket!')
          .setColor(`#0610eb`)
          .setAuthor(nazwa, avatar)
      
      message.delete()
      message.channel.send('', {
          component: button,
          embed: embed1
      });
}


module.exports.help = {
    name: `ustawticket`,
    aliases: [""]
};
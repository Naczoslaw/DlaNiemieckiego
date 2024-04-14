const { MessageEmbed } = require("discord.js")
const { dostepclear } = require('../../config/config');

const upr = new MessageEmbed()
.setTitle('CLEAR')
.setColor("#ff0000")
.setDescription(`Nie masz rangi: <@&${dostepclear}>`)

module.exports.run = async (bot, message, args) => {
        //
        if(!message.member.roles.cache.has(dostepclear)){
            return message.channel.send(upr)}
        //
	    let deleteAmount;
		//
        const błąd = new MessageEmbed()
            .setTitle('CLEAR')
            .setColor("#ff0000")
            .setDescription(`Podaj ilość wiadomości!`)
       if (!args[0]) return message.channel.send(błąd);
 
const błąd1 = new MessageEmbed()
            .setTitle('CLEAR')
            .setColor("#ff0000")
            .setDescription(`Podana wartość nie jest liczbą!`)
        if(isNaN(args[0])) return message.channel.send(błąd1);
 
const błąd2 = new MessageEmbed()
            .setTitle('CLEAR')
            .setColor("#ff0000")
            .setDescription(`Nie możesz usunąć mniej niż jedną wiadomość!`)
        if(args[0] < 1) return message.channel.send(błąd2);
 
        if (parseInt(args[0]) > 99){
 			return message.reply(`Nie możesz usunąć więcedj niż: \`99\` wiadomości!`);
		} else {
		deleteAmount = parseInt(args[0]);
    	}
 
        await message.channel.messages.fetch({ limit: args[0]}).then(messages =>{
              message.channel.bulkDelete(deleteAmount + 1, true);

            const embed3 = new MessageEmbed()
            .setTitle('CLEAR')
            .setColor("#ff0000")
            .setDescription(`Poprawnie usunięto: \`${deleteAmount}\` wiadomości`)
			message.channel.send("", {
                content: `${message.author}`,
                embed: embed3
              })
        });
    }

module.exports.help = {
    name: `clear`,
    aliases: [""]
};
const Discord = require('discord.js');
const disbut = require("discord-buttons");
const { MessageMenuOption, MessageMenu } = require("discord-buttons");

module.exports.run = async (Client, message, args, prefix) => {

  if(!message.content.startsWith(prefix)) return;
  
    const embed = new Discord.MessageEmbed()
    .setTitle('')
    .setFooter("Pomoc\n"+ Client.user.username + " | Bot stworzony przez **Wuja#4934**", Client.user.displayAvatarURL())
    .addField("**Lista kategorii**","\n\n🔰 **Komendy INFO**\n\n 🔐 **Komendy Setup** \n\n 🤖 **Komendy BOTA**")

    const embed3 = new Discord.MessageEmbed()
    .setTitle('Komendy Informacyjne')
    .setDescription("**Lista komend Informacyjnych:**\n\n userinfo, serverinfo, help")
    .setThumbnail(Client.user.displayAvatarURL())


   const embed4 = new Discord.MessageEmbed()
    .setTitle('Komendy SetUP')
    .setDescription("**Lista komend SetUP:**\n\nustawrole, ustawweryfikacja, ustawticket, ustawid")
    .setThumbnail(Client.user.displayAvatarURL())

	const embed5 = new Discord.MessageEmbed()
    .setTitle('Komendy Bota')
    .setDescription("**Lista komend:**\n\n ban, kick, mute, avatar, losuj, zdane / niezdane / losuj, ping, pv, clear, play < Naza muzyki> <LINK DO MUZYKI> | !stop")
	.setColor(`#8101c9`)
    .setThumbnail(Client.user.displayAvatarURL())

    let opcja1 = new MessageMenuOption()
    .setLabel('Komendy Informacyjne')
    .setEmoji('📢')
    .setValue('option3')
    .setDescription('Kliknij tutaj aby wyświetlić komendy Informacyjne')

    let opcja2 = new MessageMenuOption()
    .setLabel('Komendy Setup')
    .setEmoji('🔐')
    .setValue('option4')
    .setDescription('Kliknij tutaj aby wyświetlić komendy Setup')

	let opcja3 = new MessageMenuOption()
    .setLabel('Komendy Bota')
    .setEmoji('🤖')
    .setValue('option5')
    .setDescription('Kliknij tutaj aby wyświetlić komendy Informacyjne')
    
let select = new MessageMenu()
    .setID('selector')
    .setPlaceholder('Kliknij tutaj, aby wyświetlić menu pomocy!')
    .setMaxValues(1)
    .setMinValues(1)
    .addOptions(opcja1, opcja2, opcja3)


const menu = await message.channel.send(embed, select);

const filter = ( button ) => button.clicker.user.id === message.author.id; 
let collector = menu.createMenuCollector(filter, { time : 100000 }); //czas po którym menu pomocy znika

collector.on("collect" , (b) => {

    if(b.values[0] == "option3") {
        menu.edit(embed3, select)
    }

    if(b.values[0] == "option4") {
        menu.edit(embed4, select)
    }
	
	if(b.values[0] == "option5") {
        menu.edit(embed5, select)
    }

    b.reply.defer();
})
}


module.exports.help = {
    name: `help`,
    aliases: [""]
};
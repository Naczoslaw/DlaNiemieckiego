const { MessageEmbed } = require('discord.js')
const { client } = require('../..');
const { nazwa } = require('../../config/config');


module.exports.run = async (Client, message, args, prefix) => {

    if(!message.content.startsWith(prefix)) return;
    const { mentions, author, guild } = message
    let użytkownik = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    var time = new Date().toLocaleString()

        const user = message.mentions.users.first()
        if(!user){
            message.channel.send(new MessageEmbed().setDescription(`Nie znaleziono takiego użytkownika!`).setColor(`#ff0000`))
            return
        }
        const uzytkownik = guild.members.cache.get(`${user.id}`)
        //
        message.guild.fetchInvites()
        .then(invites => {
            const userInvites = invites.array().filter(o => o.inviter.id === user.id);
            var userInviteCount = 0;
            for(var i=0; i < userInvites.length; i++)
            {
                var invite = userInvites[i];
                userInviteCount += invite['uses'];
            }
                const embed = new MessageEmbed()
.setDescription(`${uzytkownik} zaprosił: \`${userInviteCount}\` użytkowników na serwer!`)
.setColor(`#4600f8`)
                message.channel.send(embed)
        })
    }

module.exports.help = {
    name: `invite`,
    aliases: [""]
};
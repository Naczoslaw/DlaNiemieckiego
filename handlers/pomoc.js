const {client} = require('../index');
const { MessageEmbed } = require('discord.js')

client.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.channelID;
    let userNewMember = oldMember.member.user;
    const { rolawezwania, kanałvoice, kanałinfo} = require(`../config/config`)
   let channelnotifications = client.channels.cache.get(`${kanałinfo}`)

    if(newUserChannel === `${kanałvoice}`)
//
       { 
const embed1 = new MessageEmbed()
.setTitle('INFO')
.setColor("#5eff00")
.setDescription(`${userNewMember} dołączył właśnie na kanał **Pomoc**!`)
.setFooter(`${userNewMember.tag}`, userNewMember.avatarURL())
.setTimestamp( )
channelnotifications.send("", {
                content: `<@&${rolawezwania.join("> <@&")}>`,
                embed: embed1
              })
    } else {
    }
}) 
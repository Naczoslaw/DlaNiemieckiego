const { client } = require('../index');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const invites = require('discord-invites')
invites.setup(client)

client.on('MemberJoin', async (member, invite, inviter, message) => {
const { kanalinvitelogi, nazwa, avatar } = require(`../config/config`)
const kanałinvitelogi = client.channels.cache.get(kanalinvitelogi)

    const embed = new MessageEmbed()
    .setColor("#103e8a")
    .setTimestamp()
	.setThumbnail(`https://cdn.discordapp.com/attachments/1021322808380366909/1021753487429742652/unknown.png`)
    .setAuthor(`${nazwa}`, avatar)
    .setDescription(`${member.user} | ${member.user.tag} | ${member.user.id} dołączył z zaproszenia \`${invite.code}\` użytkownika ${inviter} | ${inviter.tag}. zaproszenie Wykorzystano  \`${invite.uses}\` razy`)
    kanałinvitelogi.send(embed).catch(() => {})
});
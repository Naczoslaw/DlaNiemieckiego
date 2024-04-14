const { client } = require('../index');
const { MessageEmbed } = require("discord.js")
const { MessageButton, MessageActionRow } = require("discord-buttons")


client.on('clickButton', async (button) => { 
    if (button.id != "ip") return
    const { guild, clicker } = button
    const user = clicker.user
	const { ipserwera } = require(`../config/config`)

    const embed_ip = new MessageEmbed().setColor("#2e06eb").setDescription(`IP serwera: ${ipserwera}`)
    await button.reply.send('', { embed: embed_ip, ephemeral: true })

})
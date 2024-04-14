const { client } = require('../index');
const { MessageEmbed } = require("discord.js")
const { MessageButton, MessageActionRow } = require("discord-buttons")


client.on('clickButton', async (button) => { 
    if (button.id != "id") return
    const { guild, clicker } = button
    const user = clicker.user

    
    await button.reply.think(true)
    setTimeout(async function(){ 
        await button.reply.edit(`Twoje Discord ID: \`${button.clicker.id}\``)
    }, 4000);
    })
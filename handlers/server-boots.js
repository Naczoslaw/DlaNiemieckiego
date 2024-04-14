const {client} = require('../index');
const Discord = require("discord.js");

client.on('guildMemberUpdate', (oldMember, newMember ) => {
    const oldStatus = oldMember.premiumSince;
    const newStatus = newMember.premiumSince;
	const { IDkanałuserwerboots } = require(`../config/config`)

        if (!oldStatus && newStatus) {
            client.channels.cache.get(`${IDkanałuserwerboots}`).send(`${newMember.user} Dzięki za boosta ❤`)


        }
    });
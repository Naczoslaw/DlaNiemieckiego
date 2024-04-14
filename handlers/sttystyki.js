const {client} = require('../index');
const Discord = require("discord.js");
const config = require("../config/config"); 
const { kanał_ilosć_osób, kanał_nowy_discord, guildid } = require(`../config/config`)

client.on('guildMemberAdd', (guildMember) => {
        const guildId = `${guildid}`;
        const memberCountChannelId = `${kanał_ilosć_osób}`;
        const nicknameChannel = `${kanał_nowy_discord}`;

        client.channels.cache.get(memberCountChannelId).setName(`「🧾」Ilość osób: ${client.guilds.cache.get(guildId).memberCount}`);
        client.channels.cache.get(nicknameChannel).setName(`「🛬」Nowy: ${guildMember.user.username}`);
    })

    client.on('guildMemberRemove', (guildMember) => {
        const guildId = `${guildid}`;
        const memberCountChannelId = `${kanał_ilosć_osób}`;

        client.channels.cache.get(memberCountChannelId).setName(`「🧾」Ilość osób: ${client.guilds.cache.get(guildId).memberCount}`);
    })
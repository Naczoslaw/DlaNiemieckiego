const { client } = require('../index');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { nazwa, avatar, maxsloty, ip, kanał, idwiado } = require(`../config/config`)
const axios = require('axios');

client.on('ready', async (Client, message, args, prefix) => {
setInterval(async () => {
const getPlayerCount = async () => {
    try {
        const resp = await axios.get(`http://${ip}/players.json`)
        
        
            let total = resp;
            return total;
        

    } catch (err) {
    }
};


    getPlayerCount().then((result) => {
        
            let list = result.data;
            var id = "";
            var players = "";
            var ping = ""
            for(var i = 0; i < list.length; i++){
                id += list[i].id+'\n';
                players += list[i].name+'\n';
                ping += list[i].ping+'\n';
               
            }

            
            const kanal = client.channels.cache.get(`${kanał}`)
            const wiad = `${idwiado}`
            
            kanal.messages.fetch({around: `${wiad}`, limit: 1})
            .then(async msgg => {
                const fetchedMsg = msgg.first();
                const max = `${maxsloty}`
         

            const pListEmbed = new Discord.MessageEmbed()
                .setColor('#03fc41')
                .setTitle('STATUS - FiveM')
                .setDescription(`Gracze: **${list.length}** sloty: **${maxsloty}**`)
                .setFooter(`${nazwa}`)
                .setThumbnail(avatar)
                .addFields(
                    { name: 'ID', value: id || '0', inline: true  },
                    { name: 'Nazwa', value: players || 'brak', inline: true  },
                    { name: '📶', value: `${ping}` || 'brak', inline: true },
                   
                )
                .setTimestamp(new Date())
                fetchedMsg.edit(pListEmbed);
            })
            
            
        })
        .catch(function(){

            const kanal = client.channels.cache.get(`${kanał}`)
            const wiad = `${idwiado}`

            kanal.messages.fetch({around: `${wiad}`, limit: 1})
            .then(async msgg => {
                const fetchedMsg = msgg.first();
                const max = `${maxsloty}`
            

            const errpListEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('STATUS')
                .setDescription(`Gracze: **brak**`)
                .setFooter(`${nazwa}`)
                .setThumbnail(avatar)
                .addFields(
                    { name: 'ID', value: '0', inline: true  },
                    { name: 'Nazwa', value: 'brak', inline: true  },
                    { name: 'Ping', value: 'brak', inline: true },
                   
                )
                .setTimestamp(new Date())
                fetchedMsg.edit(errpListEmbed);
            })
        })
    }, 10 * 1000);
});
const {client} = require('../index');
const fetch = require('node-fetch');
const { ip, maxsloty, typstatusu, status, gracze, statusu } = require(`../config/config`)
const axios = require('axios');



client.once('ready', async () => {
    if(gracze) {
        setInterval(function () {
              axios.get(`http://${ip}/players.json`).then(data => {
                var users = data.data
                var que = status
                var guildd = que.replace("{ONLINE}", users.length)
                client.user.setActivity(guildd.replace("{SLOTY}", maxsloty), {
                    type: typstatusu
                  });
        }).catch(err => {
            var que = status
            var guilddd = que.replace("/", "")
            var guildd = guilddd.replace("{ONLINE}", "OFFLINE")
            client.user.setActivity(guildd.replace("{SLOTY}", ""), {
                type: typstatusu
              });
        });
        }, 10 * 1000)
                } else {
                    client.user.setActivity(statusu, {
                        type: typstatusu
                    })   
            }})
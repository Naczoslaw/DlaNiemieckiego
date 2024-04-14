const Discord = require('discord.js');

// Create a new Discord client
const client = new Discord.Client();

// Add a listener for the `message` event
client.on('message', async (message) => {
  // Check if the message contains the `!awans` command
  if (message.content.startsWith('!awans')) {
    // Get the user who sent the message
    const user = message.author;

    // Get the user who was mentioned in the message
    const mentionedUser = message.mentions.first();

    // Get the reason for the promotion
    const reason = message.content.slice(7);

    // Create an embed
    const embed = new Discord.MessageEmbed()
      .setTitle('Awans')
      .setDescription(`${user.username} awansował ${mentionedUser.username} na ${reason}`)
      .setColor('green')
      .setTimestamp(new Date());

    // Send the embed
    await message.channel.send(embed);
  }
});

// Start the client
client.login('YOUR_TOKEN');
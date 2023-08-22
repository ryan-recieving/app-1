const { Client, Events, ActivityType, Message } = require("discord.js");

module.exports = {
  data: {
    name: Events.MessageDelete,
    /**
     *
     * @param {Client} client
     * @param {Message} message,
     * @param {import("discord.js").Channel} channel
     */
    callback: async function (message, client) {
      client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author,
        image: message.attachments.first()
          ? message.attachments.first().proxyURL
          : null,
      });
    },
  },
};

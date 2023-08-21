const { Client, Events, ActivityType } = require("discord.js");
const app_config = require("../app_external/json/app@config.json");

module.exports = {
  data: {
    name: Events.ClientReady,
    once: true,
    /**
     *
     * @param {Client} client
     */
    callback: async function (client) {
      console.log("Client | ✅");
      client.user.setActivity({
        name: "Some Hoes",
        type: ActivityType.Custom,
        state: "Stalking",
      })
    },
  },
};

const { Client, Events, CommandInteraction } = require("discord.js");

module.exports = {
  data: {
    name: Events.InteractionCreate,
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    callback: async function (interaction, client) {
      if (interaction.isChatInputCommand()) {
        const App_Command = client.commands.get(interaction.commandName);
        if (!App_Command) return;

        try {
          await App_Command.callback(interaction, client);
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};

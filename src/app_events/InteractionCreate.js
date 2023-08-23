const { Client, Events, CommandInteraction } = require("discord.js");
const data_create = require("../app_external/js/app@data_create");

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

        data_create(interaction.user.id);

        try {
          console.log(`Attempting to callback: ${interaction.commandName}`);
          await App_Command.callback(interaction, client);
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};

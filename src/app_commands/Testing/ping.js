const { SlashCommandBuilder, CommandInteraction } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong."),
  /**
   *
   * @param {CommandInteraction} interaction
   */
  callback: async function (interaction) {
    await interaction.reply({ content: "Pong!", ephemeral: true });
  },
};

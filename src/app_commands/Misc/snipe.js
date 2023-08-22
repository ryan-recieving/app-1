const {
  SlashCommandBuilder,
  CommandInteraction,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("snipe")
    .setDescription("Snipes the last known message."),
  /**
   *
   * @param {CommandInteraction} interaction
   */
  callback: async function (interaction, client) {
    console.log(client.user.username);
    const message = client.snipes.get(interaction.channel.id);
    if (!message)
      return await interaction.reply({
        ephemeral: true,
        content: "There are no messages to snipe yet!",
      });

    const Embed = new EmbedBuilder()
      .setColor(0x2b2d31)
      .setDescription("> [Sniped Message](https://www.youtube.com)")
      .addFields(
        {
          name: "Content",
          value: `${message.content}`,
          inline: true,
        },
        {
          name: `Who`,
          value: `${
            interaction.guild.members.cache.get(message.author.id).user.username
          }`,
          inline: true,
        }
      );
    if (message.image) Embed.setImage(message.image);
    await interaction.reply({ embeds: [Embed] });
  },
};

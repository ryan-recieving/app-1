const {
  Client,
  Events,
  ActivityType,
  Message,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const app_config = require("../app_external/json/app@config.json");

module.exports = {
  data: {
    name: Events.MessageCreate,
    /**
     *
     * @param {Client} client
     * @param {Message} message,
     * @param {import("discord.js").Channel} channel
     */
    callback: async function (message, client) {
      if (message.content.includes("<@1141097778865520751>")) {
        const Embed = new EmbedBuilder()
          .setColor(0x2b2d31)
          .setDescription(
            `> App\n* Please use the /help command to view a list of commands`
          )
          .setFields({
            name: `App Version`,
            value: `v${app_config.Bot_Version_Major}${app_config.Bot_Version_Minor}`,
            inline: true,
          })
          .setTimestamp();
        const SupportServerButton = new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel("Support Server")
          .setURL("discord://fSPZe56Sa");
        const ActionRow = new ActionRowBuilder().addComponents(
          SupportServerButton
        );
        message.channel.send({ embeds: [Embed], components: [ActionRow] });
      }
    },
  },
};

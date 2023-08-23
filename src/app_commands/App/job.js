const {
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  ChannelType,
  Client,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  ButtonInteraction,
} = require("discord.js");

// Modals
const job_create_modal = require("../../app_external/js/Modals/app@job_create");
const job_channel_modal = require("../../app_external/js/Modals/app@job_channel");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("job")
    .setDescription("Placeholder.")
    .addSubcommandGroup((subcommandGroup) =>
      subcommandGroup
        .setName("set")
        .setDescription("Set the channel that jobs will be sent to.")
        .addSubcommand((subcommand) =>
          subcommand
            .setName("channel")
            .setDescription("Set the channel that jobs will be sent to.")
            .addChannelOption((channel_option) =>
              channel_option
                .setName("channel")
                .setDescription("The channel to be set.")
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
            )
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("create")
        .setDescription("Create a job.")
        .addStringOption((stringOption) =>
          stringOption
            .setName("title")
            .setRequired(true)
            .setMaxLength(30)
            .setDescription("The title of the job.")
        )
        .addStringOption((stringOption) =>
          stringOption
            .setName("priority")
            .setName("priority")
            .setDescription("The priority of the job.")
            .setRequired(true)
            .addChoices(
              {
                name: "High",
                value: "high",
              },
              {
                name: "In Progress",
                value: "ip",
              },
              {
                name: "Low",
                value: "low",
              }
            )
        )
    ),
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  callback: async function (interaction, client) {
    console.log(interaction.options.getSubcommand());
    if (interaction.options.getSubcommand() === "channel") {
      const channel_subcommand = interaction.options.getChannel("channel");
      function send_job_create() {
        const Embed = new EmbedBuilder()
          .setColor(0x2b2d31)
          .setDescription(
            `> Job's will now be sent to <#${channel_subcommand.id}>.`
          );
        interaction.reply({ embeds: [Embed], ephemeral: true });
      }

      const job_channel_data = await job_channel_modal.findOne({
        Guild_Identifier: interaction.guild.id,
      });
      if (job_channel_data) {
        send_job_create();
        await job_channel_modal.findOneAndUpdate(
          { Guild_Identifier: interaction.guild.id },
          { Identifier: channel_subcommand.id }
        );
      } else {
        send_job_create();
        const new_job_channel_data = await job_channel_modal.create({
          Identifier: channel_subcommand.id,
          Guild_Identifier: interaction.guild.id,
        });
        new_job_channel_data.save();
      }
    } else if (interaction.options.getSubcommand() === "create") {
      const job_title_subcommand = interaction.options.getString("title");
      const job_channel_data = await job_channel_modal.findOne({
        Guild_Identifier: interaction.guild.id,
      });

      if (job_channel_data) {
        // ? Gate Open
        if (!client.channels.cache.get(job_channel_data.Identifier)) {
          const Gate_Closed_Embed = new EmbedBuilder()
            .setColor(0x2b2d31)
            .setDescription(
              `> This channel has been deleted, or something went wrong. Please set a new channel with </job set channel:1143668932344033330>`
            );
          return await interaction.reply({ embeds: [Gate_Closed_Embed] });
        } else {
          let Gate_Input_Got = "";
          const Gate_Request = new ModalBuilder()
            .setCustomId("gate_request")
            .setTitle("Description");
          const Gate_Input = new TextInputBuilder()
            .setCustomId("gate_input")
            .setRequired(true)
            .setStyle(TextInputStyle.Paragraph)
            .setLabel("Job Description")
            .setMaxLength(400);
          const Gate_Row = new ActionRowBuilder().addComponents(Gate_Input);
          Gate_Request.addComponents(Gate_Row);

          await interaction.showModal(Gate_Request);
          interaction
            .awaitModalSubmit({
              filter: (i) => i.user.id === interaction.user.id,
              time: 99e6,
            })
            .then(async (modalInteraction) => {
              if (modalInteraction.customId === "gate_request") {
                const array = {
                  high: "High",
                  low: "Low",
                  ip: "In Progress",
                };
                const fetched_input =
                  modalInteraction.fields.getTextInputValue("gate_input");
                const Gate_Open = new EmbedBuilder()
                  .setColor(0x2b2d31)
                  .setTimestamp()
                  .addFields(
                    {
                      name: "Title",
                      value: `${job_title_subcommand}`,
                      inline: true,
                    },
                    {
                      name: "Prority",
                      value: `${
                        array[interaction.options.getString("priority")]
                      }`,
                      inline: true,
                    }
                  )
                  .setDescription(`## Job Description: \n${fetched_input}`);
                client.channels.cache
                  .get(job_channel_data.Identifier)
                  .send({ embeds: [Gate_Open] });
                await modalInteraction.reply({
                  content: "Job Successfully Created",
                  ephemeral: true,
                });
              }
            });
        }
      } else {
        // ? Gate Closed
        const Gate_Closed_Embed = new EmbedBuilder()
          .setColor(0x2b2d31)
          .setDescription(
            `> Please set a job-channel using </job set channel:1143668932344033330>`
          );
        return await interaction.reply({ embeds: [Gate_Closed_Embed] });
      }
    }
  },
};

const {
  EmbedBuilder,
  MessageFlags,
  CommandInteraction,
  Client,
} = require("discord.js");

module.exports = {
  name: "nightcore",
  description: "Sets NightCore Filter.",
  userPrams: [],
  botPrams: ["EMBED_LINKS"],
  player: true,
  dj: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  options: [
    {
      name: "input",
      description: "The Filters input (on or off).",
      type: 3, // STRING type
      required: true,
      choices: [
        {
          name: "on",
          value: "1", // value should be a string
        },
        {
          name: "off",
          value: "2", // value should be a string
        },
      ],
    },
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction, prefix) => {
    await interaction.deferReply({
      ephemeral: false,
    });
    const input = interaction.options.getString("input");
    const player = client.manager.players.get(interaction.guild.id);

    const emojiequalizer = interaction.client.emoji.filter;
    if (input === "2") {
      await player.shoukaku.clearFilters();
      return await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor(client.color)
            .setDescription(`${emojiequalizer} NightCore Mode Is \`OFF\``),
        ],
      });
    } else if (input === "1") {
      await player.shoukaku.setFilters({
        op: "filters",
        guildId: interaction.guild.id,
        equalizer: [
          { band: 1, gain: 0.3 },
          { band: 0, gain: 0.3 },
        ],
        timescale: { pitch: 1.2 },
        tremolo: { depth: 0.3, frequency: 14 },
      });
      return await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor(client.color)
            .setDescription(`${emojiequalizer} NightCore Mode Is \`ON\``),
        ],
      });
    }
  },
};

const {
  EmbedBuilder,
  MessageFlags,
  CommandInteraction,
  Client,
} = require("discord.js");

module.exports = {
  name: "clear",
  description: "Clear Queue",
  userPrams: [],
  botPrams: ["EMBED_LINKS"],
  dj: true,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });
    const player = client.manager.players.get(interaction.guild.id);
    if (!player.queue[0]) {
      const thing = new EmbedBuilder()
        .setColor(client.color)
        .setDescription("There Is Nothing In The Queue");
      return interaction.editReply({ embeds: [thing] });
    }
    const size = player.queue[0];
    player.queue = [];

    await player.queue.push(size);

    const embed = new EmbedBuilder()
      .setColor(client.color)
      .setDescription(`Successfully Clear Queue `);
    await interaction.editReply({ embeds: [embed] });
  },
};

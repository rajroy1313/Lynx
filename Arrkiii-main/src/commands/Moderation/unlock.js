/** @format
 *
 * Arrkiii By Ozuma xd
 * © 2024 Arrkiii Development
 *
 */

const {
  EmbedBuilder,
  MessageFlags,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  name: "unlock",
  category: "Moderation",
  cooldown: 3,
  aliases: ["unlockchannel"],
  description: "to unlock channel",
  args: false,
  usage: "",
  userPerms: ["ManageChannels"],
  botPerms: ["ManageChannels"],
  owner: false,
  execute: async (message, args, client, prefix) => {
    const channel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]) ||
      message.channel;
    if (channel.manageable) {
      channel.permissionOverwrites.edit(message.guild.roles.everyone, {
        SendMessages: true,
        reason: `${message.author.tag} (${message.author.id})`,
      });
      const emb = new EmbedBuilder()
        .setDescription(`${channel} has been unlocked for @everyone role`)
        .setColor(client.color);
      return message.channel.send({ embeds: [emb] });
    } else {
      const embi = new EmbedBuilder()
        .setDescription(
          `I don't have adequate permissions to unlock this channel.`,
        )
        .setColor(client.color);
      return message.channel.send({ embeds: [embi] });
    }
  },
};

const { PermissionsBitField } = require("discord.js");
const db = require("../../schema/antilink");

module.exports = {
  name: "messageCreate",
  run: async (client, message) => {
    if (!message.guild || message.author.bot) return;

    // Fetch anti-link data from the database
    const antiLinkData = await db.findOne({ guildId: message.guild.id });
    if (!antiLinkData || !antiLinkData.isEnabled) return; // Ensure anti-link is enabled

    const botMember = message.guild.members.me;
    if (!botMember) return;

    // Check if the author or their roles are whitelisted
    if (
      antiLinkData.whitelistUsers?.includes(message.author.id) ||
      message.member.roles.cache.some((role) =>
        antiLinkData.whitelistRoles.includes(role.id),
      )
    ) {
      return;
    }

    if (
      message.member.roles.highest.comparePositionTo(botMember.roles.highest) >=
        0 || // User has a higher or equal role
      message.member.permissions.has("Administrator") // User has admin permissions
    ) {
      return; // Do nothing
    }

    // Ensure the bot has sufficient permissions
    if (!botMember.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      console.warn(
        `Bot lacks ManageMessages permission in ${message.guild.name}`,
      );
      return;
    }

    // Check for links
    const linkRegex = /(?:https?:\/\/|discord\.gg\/)/gi;
    if (linkRegex.test(message.content)) {
      try {
        await message.delete();
        const muteDuration = 5 * 60 * 1000;
        await message.member.timeout(muteDuration, "Posted a prohibited link.");
        const notification = await message.channel.send(
          `🚫 \`${message.author.username}\` has been muted for 5 minutes for posting prohibited links.`,
        );
        setTimeout(() => notification.delete().catch(() => {}), 5000); // Auto-delete notification
      } catch (error) {
        console.error("Error handling anti-link:", error);

        // Notify about insufficient permissions
        await message.channel.send(
          "I don't have sufficient permissions to handle anti-link actions. Please check my role and permissions.",
        );
      }
    }
  },
};

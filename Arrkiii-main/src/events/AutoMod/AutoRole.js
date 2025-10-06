const AutoRole = require("../../schema/autorole");

module.exports = {
  name: "guildMemberAdd",
  run: async (client, member) => {
    try {
      if (!member || !member.guild) {
        console.error("Invalid member object received:", member);
        return;
      }
      /* member.send({embeds: [new client.embed().d(`Thanks For Joining ${member.guild.name} !! I'm **${client.user.username}**, the best music bot here. You can Add me to your server [click here](${client.config.links.invite})`)]}).catch(() => { })
       */
      const autoRole = await AutoRole.findOne({ guildId: member.guild.id });
      if (!autoRole) return;
      const rolesToAdd = [];
      if (member.user.bot) {
        for (const roleId of autoRole.botRoles) {
          const botRole = member.guild.roles.cache.get(roleId);
          if (botRole) {
            rolesToAdd.push(botRole);
          } else {
            return;
          }
        }
      } else {
        for (const roleId of autoRole.humanRoles) {
          const humanRole = member.guild.roles.cache.get(roleId);
          if (humanRole) {
            rolesToAdd.push(humanRole);
          } else return;
        }
      }
      if (rolesToAdd.length > 0) {
        await member.roles.add(rolesToAdd).catch(() => {
          console.log(`missing perms in ${member.guild.name} autorole`);
        });
      }
    } catch (err) {
      console.error("Error handling guildMemberAdd event:", err);
    }
  },
};

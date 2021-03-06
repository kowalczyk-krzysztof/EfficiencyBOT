// Discord
import { Message } from 'discord.js';
// OSRS cache
import { fetchOsrsStats, osrsStats } from '../../cache/osrsCache';
// Cooldown cache
import { isOnCooldown } from '../../cache/cooldown';
// UTILS: Embeds
import {
  OsrsEmbed,
  EmbedTitles,
  usernameString,
  ErrorEmbed,
} from '../../utils/embed';
// UTILS: Interfaces
import { OsrsPlayer } from '../../utils/osrs/interfaces';
// UTILS: Enums
import { CommandCooldowns, TempleOther } from '../../utils/osrs/enums';
// UTILS: Runescape name validator
import {
  runescapeNameValidator,
  invalidUsername,
} from '../../utils/osrs/runescapeNameValidator';
// UTILS: Capitalize first letter
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
// UTILS: Error handler
import { errorHandler } from '../../utils/errorHandler';
// Anti-spam
import { isSpamming } from '../../cache/antiSpam';

export const lms = async (
  msg: Message,
  commandName: string,
  ...args: string[]
): Promise<Message | undefined> => {
  if (isSpamming(msg, commandName)) return;
  const cooldown: number = CommandCooldowns.LMS;
  const username: string | undefined = runescapeNameValidator(args);
  if (!username) return msg.channel.send(invalidUsername);
  if (isOnCooldown(msg, commandName, cooldown, false, username)) return;
  const embed: OsrsEmbed = new OsrsEmbed()
    .setTitle(EmbedTitles.LMS)
    .addField(usernameString, `\`\`\`${username}\`\`\``);
  if (username in osrsStats)
    return msg.channel.send(generateResult(embed, osrsStats[username]));
  const isFetched: boolean = await fetchOsrsStats(msg, username);
  if (isFetched)
    return msg.channel.send(generateResult(embed, osrsStats[username]));
  return;
};
// Generates embed sent to user
const generateResult = (
  embed: OsrsEmbed,
  playerObject: OsrsPlayer
): OsrsEmbed | ErrorEmbed => {
  if (!playerObject) return errorHandler();
  embed.addField(
    `${TempleOther.LMS} ${capitalizeFirstLetter(
      TempleOther.SCORE.toUpperCase()
    )}:`,
    `\`\`\`${playerObject[TempleOther.LMS][TempleOther.SCORE]}\`\`\``
  );
  return embed;
};

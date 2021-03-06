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
import {
  CommandCooldowns,
  OsrsOther,
  TempleOther,
} from '../../utils/osrs/enums';
// UTILS: Runescape name validator
import {
  runescapeNameValidator,
  invalidUsername,
} from '../../utils/osrs/runescapeNameValidator';
// UTILS: Error handler
import { errorHandler } from '../../utils/errorHandler';
// Anti-spam
import { isSpamming } from '../../cache/antiSpam';

export const lp = async (
  msg: Message,
  commandName: string,
  ...args: string[]
): Promise<Message | undefined> => {
  if (isSpamming(msg, commandName)) return;
  const cooldown: number = CommandCooldowns.LP;
  const username: string | undefined = runescapeNameValidator(args);
  if (!username) return msg.channel.send(invalidUsername);
  if (isOnCooldown(msg, commandName, cooldown, false, username)) return;
  const embed: OsrsEmbed = new OsrsEmbed()
    .setTitle(EmbedTitles.LEAGUEPTS)
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
    `${OsrsOther.LEAGUE.toUpperCase()}:`,
    `\`\`\`${playerObject[OsrsOther.LEAGUE][TempleOther.SCORE]}\`\`\``
  );
  return embed;
};

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
  OsrsOtherAliases,
  TempleOther,
} from '../../utils/osrs/enums';
// UTILS: Runescape name validator
import {
  runescapeNameValidator,
  invalidUsername,
} from '../../utils/osrs/runescapeNameValidator';
// UTILS: Prefix validator
import { isPrefixValid } from '../../utils/osrs/isPrefixValid';
// UTILS: Error handler
import { errorHandler } from '../../utils/errorHandler';
import { isSpamming } from '../../cache/antiSpam';
// Anti-spam

export const bh = async (
  msg: Message,
  commandName: string,
  ...args: string[]
): Promise<Message | undefined> => {
  if (isSpamming(msg, commandName)) return;
  const prefix: string | undefined = isPrefixValid(msg, args, bhTypes);
  if (!prefix) return;

  const cooldown: number = CommandCooldowns.BH;

  const user: string[] = args.slice(1);
  const username: string | undefined = runescapeNameValidator(user);
  if (!username) return msg.channel.send(invalidUsername);
  if (isOnCooldown(msg, commandName, cooldown, false, username)) return;
  const embed: OsrsEmbed = new OsrsEmbed()
    .setTitle(EmbedTitles.BH)
    .addField(usernameString, `\`\`\`${username}\`\`\``);
  if (username in osrsStats) {
    const result: OsrsEmbed = generateResult(
      embed,
      osrsStats[username],
      prefix
    );
    return msg.channel.send(result);
  }
  const isFetched: boolean = await fetchOsrsStats(msg, username);
  if (isFetched) {
    const result: OsrsEmbed = generateResult(
      embed,
      osrsStats[username],
      prefix
    );
    return msg.channel.send(result);
  }
  return;
};
// Generates embed sent to user
const generateResult = (
  embed: OsrsEmbed,
  playerObject: OsrsPlayer,
  prefix: string
): OsrsEmbed | ErrorEmbed => {
  if (!playerObject) return errorHandler();
  let scoreType: string | number;
  let title: string;
  if (prefix === OsrsOtherAliases.BH_ROGUE) {
    scoreType = playerObject[OsrsOther.BH_ROGUE][TempleOther.SCORE];
    title = OsrsOther.BH_ROGUE;
  } else {
    scoreType = playerObject[OsrsOther.BH_HUNTER][TempleOther.SCORE];
    title = OsrsOther.BH_HUNTER;
  }
  embed.addField(
    `${title.toUpperCase()} ${TempleOther.SCORE.toUpperCase()}:`,
    `\`\`\`${scoreType}\`\`\``
  );
  return embed;
};

const bhTypes: string[] = [
  OsrsOtherAliases.BH_ROGUE,
  OsrsOtherAliases.BH_HUNTER,
];

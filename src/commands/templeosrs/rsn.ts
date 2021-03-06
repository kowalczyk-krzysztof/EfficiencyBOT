// Discord
import { Message } from 'discord.js';
// TempleOSRS Cache
import { playerNames, fetchTemple } from '../../cache/templeCache';
// Cooldown cache
import { isOnCooldown } from '../../cache/cooldown';
// UTILS: Embeds
import { ErrorEmbed, TempleEmbed } from '../../utils/embed';
// UTILS: Interfaces
import { TemplePlayerNames } from '../../utils/osrs/interfaces';
// UTILS: Enums
import {
  TempleOther,
  TempleCacheType,
  CommandCooldowns,
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

export const rsn = async (
  msg: Message,
  commandName: string,
  ...args: string[]
): Promise<Message | undefined> => {
  if (isSpamming(msg, commandName)) return;
  const cooldown = CommandCooldowns.RSN;
  const username: string | undefined = runescapeNameValidator(args);
  if (!username) return msg.channel.send(invalidUsername);
  if (isOnCooldown(msg, commandName, cooldown, false, username)) return;
  const embed: TempleEmbed = new TempleEmbed();
  if (username in playerNames)
    return msg.channel.send(generateResult(embed, playerNames[username]));

  const dataType: TempleCacheType = TempleCacheType.PLAYER_NAMES;
  const isFetched: boolean = await fetchTemple(msg, username, dataType);
  if (isFetched)
    return msg.channel.send(generateResult(embed, playerNames[username]));
  return;
};
// Generates embed sent to user
const generateResult = (
  embed: TempleEmbed,
  playerObject: TemplePlayerNames
): TempleEmbed | ErrorEmbed => {
  if (!playerObject) return errorHandler();
  const names: string[] = [];
  for (const alias in playerObject[TempleOther.ALIASES]) {
    names.push(alias);
  }
  const data: string = names.join('\n');
  embed.addField('NAMES:', `\`\`\`${data}\`\`\``);
  return embed;
};

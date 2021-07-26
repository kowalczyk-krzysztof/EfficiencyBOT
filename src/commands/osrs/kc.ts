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
import { OsrsPlayer, BossOrMinigame } from '../../utils/osrs/interfaces';
// UTILS: Enums
import {
  TempleOther,
  BossCases,
  OsrsRandom,
  CommandCooldowns,
} from '../../utils/osrs/enums';
// UTILS: Runescape name validator
import {
  runescapeNameValidator,
  invalidUsername,
} from '../../utils/osrs/runescapeNameValidator';
// UTILS: Input validator
import { bossFields, bossList } from '../../utils/osrs/inputValidator';
// UTILS: Boss validator
import { bossValidator, BossValidation } from '../../utils/osrs/bossValidator';
// UTILS: Error handler
import { errorHandler } from '../../utils/errorHandler';
import {
  invalidPrefixMsg,
  PrefixCategories,
} from '../../utils/osrs/isPrefixValid';
// Anti-spam
import { isSpamming } from '../../cache/antiSpam';

export const kc = async (
  msg: Message,
  commandName: string,
  ...args: string[]
): Promise<Message | undefined> => {
  if (isSpamming(msg, commandName)) return;
  if (!args.length)
    return msg.channel.send(invalidPrefixMsg(bossList, PrefixCategories.BOSS));
  const indexes: number[] = [0, 1, 2];
  // This is done so the cooldown is per unique command + boss validation needs lowercase
  const lowerCasedArguments: string[] = args.map((e: string) => {
    return e.toLowerCase();
  });
  const bossValidation: BossValidation | undefined = bossValidator(
    msg,
    lowerCasedArguments,
    indexes
  );

  let user: string[];

  if (!bossValidation) return;
  else if (bossValidation.bossCase === BossCases.ONE_WORD) {
    user = lowerCasedArguments.slice(1);
  } else if (bossValidation.bossCase === BossCases.TWO_WORD) {
    user = lowerCasedArguments.slice(2);
  } else if (bossValidation.bossCase === BossCases.THREE_WORDS) {
    user = lowerCasedArguments.slice(3);
  } else {
    user = lowerCasedArguments.slice(1);
  }
  const boss: keyof OsrsPlayer = bossValidation.boss as keyof OsrsPlayer;

  const cooldown: number = CommandCooldowns.KC;

  const username: string | undefined = runescapeNameValidator(user);
  if (!username) return msg.channel.send(invalidUsername);
  if (
    isOnCooldown(
      msg,
      commandName,
      cooldown,
      false,
      lowerCasedArguments.join('')
    )
  )
    return;
  const embed: OsrsEmbed = new OsrsEmbed()
    .setTitle(EmbedTitles.KC)
    .addField(usernameString, `\`\`\`${username}\`\`\``);
  if (username in osrsStats) {
    const field: keyof OsrsPlayer | undefined = bossFields(
      boss
    ) as keyof OsrsPlayer;
    if (!field) return;

    const result: OsrsEmbed = generateResult(embed, osrsStats[username], field);
    return msg.channel.send(result);
  }
  const isFetched: boolean = await fetchOsrsStats(msg, username);
  if (isFetched) {
    const field: keyof OsrsPlayer | undefined = bossFields(
      boss
    ) as keyof OsrsPlayer;
    if (!field) return;
    const result: OsrsEmbed = generateResult(embed, osrsStats[username], field);
    return msg.channel.send(result);
  }
  return;
};
// Generates embed sent to user
const generateResult = (
  embed: OsrsEmbed,
  playerObject: OsrsPlayer,
  field: keyof OsrsPlayer
): OsrsEmbed | ErrorEmbed => {
  if (!playerObject) return errorHandler();
  const boss: BossOrMinigame = playerObject[field] as BossOrMinigame;
  embed.addField(`${OsrsRandom.BOSS.toUpperCase()}:`, `\`\`\`${field}\`\`\``);
  embed.addField(
    `${OsrsRandom.KILLS.toUpperCase()}:`,
    `\`\`\`${boss[TempleOther.SCORE]}\`\`\``
  );
  return embed;
};

// Discord
import { Message } from 'discord.js';
// TempleOSRS Cache
import { fetchTemple, playerOverviewOther } from '../../cache/templeCache';
// Cooldown cache
import { isOnCooldown } from '../../cache/cooldown';
// UTILS: Embeds
import {
  TempleEmbed,
  usernameString,
  EmbedTitles,
  ErrorEmbed,
} from '../../utils/embed';
// UTILS: Interfaces
import {
  TempleOtherTable,
  TempleOverviewOther,
} from '../../utils/osrs/interfaces';
// UTILS: Enums
import {
  CommandCooldowns,
  OsrsRandom,
  TempleCacheType,
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
// UTILS: Temple Overview time validator
import { templeOverviewTimeAliases } from '../../utils/osrs/inputValidator';
import {
  formatOverviewTime,
  templeOverviewTimeValidator,
} from '../../utils/osrs/templetime';
// UTILS: Temple index to key
import { indexToBoss } from '../../utils/osrs/templeIndex';
// Anti-spam
import { isSpamming } from '../../cache/antiSpam';

export const topboss = async (
  msg: Message,
  commandName: string,
  ...args: string[]
): Promise<Message | undefined> => {
  if (isSpamming(msg, commandName)) return;
  const time: string | undefined = isPrefixValid(
    msg,
    args,
    templeOverviewTimeAliases
  );
  if (!time) return;
  const formattedTime: string | undefined = templeOverviewTimeValidator(time);

  const lowerCasedArguments: string[] = args.map((e: string) => {
    return e.toLowerCase();
  });

  const user: string[] = args.slice(1);

  const cooldown: number = CommandCooldowns.TOPBOSS;

  const username: string | undefined = runescapeNameValidator(user);
  if (!username) return msg.channel.send(invalidUsername);
  // Check cooldown
  if (
    isOnCooldown(
      msg,
      commandName,
      cooldown,
      false,
      lowerCasedArguments.join(', ')
    )
  )
    return;
  const userNameWithTime: string = username + formattedTime;
  const embed: TempleEmbed = new TempleEmbed()
    .setTitle(EmbedTitles.TOPBOSS)
    .addField(usernameString, `\`\`\`${username}\`\`\``);
  if (userNameWithTime in playerOverviewOther)
    return msg.channel.send(
      generateResult(
        embed,
        playerOverviewOther[userNameWithTime],
        time as string
      )
    );
  const dataType: TempleCacheType = TempleCacheType.PLAYER_OVERVIEW_OTHER;
  const isFetched: boolean = await fetchTemple(
    msg,
    username,
    dataType,
    formattedTime
  );
  if (isFetched)
    return msg.channel.send(
      generateResult(
        embed,
        playerOverviewOther[userNameWithTime],
        time as string
      )
    );
  return;
};

// Generates embed sent to user
const generateResult = (
  embed: TempleEmbed,
  playerObject: TempleOverviewOther,
  time: string
): TempleEmbed | ErrorEmbed => {
  if (!playerObject) return errorHandler();
  // Format time
  const formattedTime: string = formatOverviewTime(time);
  // Try to match boss index with field
  const boss: keyof TempleOtherTable = indexToBoss(
    playerObject[TempleOther.INFO][TempleOther.TOP_BOSS]
  ) as keyof TempleOtherTable;
  embed.addField(`${OsrsRandom.TIME_PERIOD}:`, `\`\`\`${formattedTime}\`\`\``);
  // If boss has not been found, then return no data msg
  if (!boss)
    embed.addField(
      `${OsrsRandom.NO_DATA}`,
      `\`\`\`No data for this period of time\`\`\``
    );
  else {
    embed.addField(`${OsrsRandom.BOSS.toUpperCase()}:`, `\`\`\`${boss}\`\`\``);
    let xp: number;
    if (!playerObject[TempleOther.TABLE][boss][TempleOther.XP]) xp = 0;
    else xp = playerObject[TempleOther.TABLE][boss][TempleOther.XP];
    embed.addField(`${OsrsRandom.KILLS.toUpperCase()}:`, `\`\`\`${xp}\`\`\``);
    if (formattedTime === 'All Time')
      embed.addField('NOTE:', `Temple boss tracking started on 01/01/2020`);
  }

  return embed;
};

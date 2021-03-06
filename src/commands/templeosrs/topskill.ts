// Discord
import { Message } from 'discord.js';
// TempleOSRS Cache
import { fetchTemple, playerOverviewSkill } from '../../cache/templeCache';
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
  TempleSkillTable,
  TempleOverviewSkill,
} from '../../utils/osrs/interfaces';
// UTILS: Enums
import {
  CommandCooldowns,
  OsrsRandom,
  Skills,
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
  templeOverviewTimeValidator,
  formatOverviewTime,
} from '../../utils/osrs/templetime';
// UTILS: Temple index to key
import { indexToSkill } from '../../utils/osrs/templeIndex';
// Anti-spam
import { isSpamming } from '../../cache/antiSpam';
// UTILS: Number formatter
import {
  numberFormatter,
  NumberFormatTypes,
} from '../../utils/numberFormatter';

export const topskill = async (
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

  const cooldown: number = CommandCooldowns.TOPSKILL;

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
    .setTitle(EmbedTitles.TOPSKILL)
    .addField(usernameString, `\`\`\`${username}\`\`\``);
  if (userNameWithTime in playerOverviewSkill)
    return msg.channel.send(
      generateResult(
        embed,
        playerOverviewSkill[userNameWithTime],
        time as string
      )
    );

  const dataType: TempleCacheType = TempleCacheType.PLAYER_OVERVIEW_SKILL;
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
        playerOverviewSkill[userNameWithTime],
        time as string
      )
    );
  return;
};

// Generates embed sent to user
const generateResult = (
  embed: TempleEmbed,
  playerObject: TempleOverviewSkill,
  time: string
): TempleEmbed | ErrorEmbed => {
  if (!playerObject) return errorHandler();

  // Format time
  const formattedTime: string = formatOverviewTime(time);
  // Try to match skill index with field
  const skill: keyof TempleSkillTable = indexToSkill(
    playerObject[TempleOther.INFO][TempleOther.TOP_SKILL]
  ) as keyof TempleSkillTable;
  embed.addField(`${OsrsRandom.TIME_PERIOD}:`, `\`\`\`${formattedTime}\`\`\``);
  // If boss has not been found, then return no data msg
  if (!skill)
    embed.addField(
      `${OsrsRandom.NO_DATA}`,
      `\`\`\`No data for this period of time\`\`\``
    );
  else {
    let formattedSkill;
    if (skill === Skills.RC) formattedSkill = OsrsRandom.RUNECRAFTING;
    else formattedSkill = skill;
    embed.addField(
      `${OsrsRandom.SKILL.toUpperCase()}:`,
      `\`\`\`${formattedSkill}\`\`\``
    );
    let xp: number | string | undefined;
    if (!playerObject[TempleOther.TABLE][skill][TempleOther.XP]) xp = 0;
    else
      xp = numberFormatter(
        playerObject[TempleOther.TABLE][skill][TempleOther.XP],
        NumberFormatTypes.EN_US
      );
    embed.addField(
      `${OsrsRandom.EXP_LONG.toUpperCase()}:`,
      `\`\`\`${xp} ${TempleOther.EXP}\`\`\``
    );
  }
  return embed;
};

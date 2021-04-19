// Discord
import { Message } from 'discord.js';
// TempleOSRS Cache
import { fetchTemple, playerRecords } from '../../cache/templeCache';
// Cooldown cache
import { isOnCooldown } from '../../cache/cooldown';
// UTILS: Embeds
import {
  TempleEmbed,
  EmbedTitles,
  usernameString,
  ErrorEmbed,
} from '../../utils/embed';
// UTILS: Interfaces
import {
  TemplePlayerRecords,
  PlayerRecordsTimes,
  ExpAndDate,
} from '../../utils/osrs/interfaces';
// UTILS: Enums
import {
  TempleOther,
  TempleCacheType,
  OsrsRandom,
  ValidInputCases,
} from '../../utils/osrs/enums';
// UTILS: Runescape name validator
import {
  runescapeNameValidator,
  invalidUsername,
  invalidRSN,
} from '../../utils/osrs/runescapeNameValidator';
// UTILS: Input validator
import {
  templeGainsRecords,
  fieldNameCheck,
} from '../../utils/osrs/inputValidator';
// UTILS: Capitalize first letter
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
// UTILS: Error handler
import { errorHandler } from '../../utils/errorHandler';
// UTILS: FIeld name formatter
import { fieldNameFormatter } from '../../utils/osrs/fieldNameFormatter';

export const record = async (
  msg: Message,
  commandName: string,
  ...args: string[]
): Promise<Message | undefined | ErrorEmbed> => {
  // This is done so the cooldown is per unique command e.g if someone checks weekly record then wants to check monthly record then it won't give them a cooldown
  const lowerCasedArguments: string[] = args.map((e: string) => {
    return e.toLowerCase();
  });
  // Validate user input and returns an object
  const parsedInput:
    | {
        rsn: string[] | undefined;
        time: string | undefined;
        field: string | undefined;
        case: string | undefined;
      }
    | undefined = templeGainsRecords(msg, args, commandName);
  if (parsedInput === undefined) return errorHandler();
  const cooldown: number = 30;
  if (
    parsedInput.rsn !== undefined &&
    parsedInput.time !== undefined &&
    parsedInput.field !== undefined &&
    parsedInput.case !== undefined
  ) {
    // Check if rsn is valid runescape name
    const nameCheck: string = runescapeNameValidator(parsedInput.rsn);
    if (nameCheck === invalidRSN) return msg.channel.send(invalidUsername);
    const username: string = nameCheck;
    // Check if command is on cooldown
    if (
      isOnCooldown(
        msg,
        commandName,
        cooldown,
        false,
        lowerCasedArguments.join('')
      ) === true
    )
      return;
    // Because there are multiple time options, I want to have separate keys for each option, so instead of passing username I'm passing username + time so the key name becomes "zezimaweek" instead of just "zezima"
    const userNameWithTime: string = username + parsedInput.time;
    const embed: TempleEmbed = new TempleEmbed()
      .setTitle(EmbedTitles.RECORDS)
      .addField(usernameString, `${username}`);
    // Check if item is in cache
    if (userNameWithTime in playerRecords) {
      // Try to match the input field with key name on player object
      const field: keyof TemplePlayerRecords | undefined = fieldNameCheck(
        parsedInput.field,
        parsedInput.case
      ) as keyof TemplePlayerRecords;
      if (field === undefined) return errorHandler();
      // Generate embed
      else {
        const result: TempleEmbed = generateResult(
          field,
          embed,
          playerRecords[userNameWithTime],
          parsedInput.time as keyof PlayerRecordsTimes,
          lowerCasedArguments
        );
        return msg.channel.send(result);
      }
    } else {
      const dataType: TempleCacheType = TempleCacheType.PLAYER_RECORDS;
      // Fetch data from API endpoint
      const isFetched: boolean = await fetchTemple(
        msg,
        username,
        dataType,
        parsedInput.time
      );
      if (isFetched === true) {
        // Try to match the input field with key name on player object
        const field: keyof TemplePlayerRecords | undefined = fieldNameCheck(
          parsedInput.field,
          parsedInput.case
        ) as keyof TemplePlayerRecords;
        if (field === undefined) return errorHandler();
        else {
          // Generate result
          const result: TempleEmbed = generateResult(
            field,
            embed,
            playerRecords[userNameWithTime],
            parsedInput.time as keyof PlayerRecordsTimes,
            lowerCasedArguments
          );

          return msg.channel.send(result);
        }
      } else return;
    }
  }
};
// Generates embed sent to user
const generateResult = (
  field: keyof TemplePlayerRecords,
  embed: TempleEmbed,
  playerObject: TemplePlayerRecords,
  time: keyof PlayerRecordsTimes,
  args: string[]
): TempleEmbed | ErrorEmbed => {
  if (playerObject === undefined) return errorHandler();
  else {
    // Changing the time value (string) to have a first capital letter
    const capitalFirst: string = capitalizeFirstLetter(time);
    const formattedField: string = fieldNameFormatter(field);
    // If there are no records the key value is an empty array
    if (Array.isArray(playerObject[field]) === false) {
      // If there's no record for specific period of time then the key doesn't exist
      if (playerObject[field][time] !== undefined) {
        // Formatting how numbers are displayed
        const timeField: ExpAndDate = playerObject[field][time] as ExpAndDate;
        const value: string | number = timeField[TempleOther.XP];
        let formattedValue;
        if (args[0] === ValidInputCases.SKILL) {
          const formatter: Intl.NumberFormat = new Intl.NumberFormat(
            OsrsRandom.DATE_FORMAT
          );
          formattedValue = formatter.format(value as number);
        } else {
          formattedValue = parseInt(value.toString());
        }
        // Changing sufix depending on whether the type is skill or not
        let ending: string;
        if (args[0] === ValidInputCases.SKILL) ending = ` ${TempleOther.XP}`;
        else if (args[0] === ValidInputCases.BOSS)
          ending = ` ${OsrsRandom.KILLS}`;
        else ending = '';
        // Formatting date
        const stringToDate: Date = new Date(
          playerObject[field][time][TempleOther.DATE_LOWERCASE]
        );
        const formattedDate: string = new Intl.DateTimeFormat('en-GB').format(
          stringToDate
        );
        embed.addField('Time Period', `${capitalFirst}`);
        embed.addField(`${formattedField}`, `${formattedValue}${ending}`);
        embed.addField('Record set on:', `${formattedDate}`);
      } else {
        embed.addField(`Time Period`, `${capitalFirst}`);
        embed.addField(
          `NO DATA`,
          `No records for this period of time for \`\`\`${formattedField}\`\`\``
        );
      }
    } else {
      embed.addField(`NO DATA`, `No records for \`\`\`${formattedField}\`\`\``);
    }
    return embed;
  }
};

import { Message } from 'discord.js';
// Utils
import { runescapeNameValidator } from '../../utils/osrs/runescapeNameValidator';
import { argsToString } from '../../utils/argsToString';
import { Embed } from '../../utils/embed';
import {
  playerNames,
  fetchPlayerNames,
  PlayerNames,
} from '../../cache/templeCache';

export const rsn = async (
  msg: Message,
  ...args: string[]
): Promise<Message | undefined> => {
  const nameCheck: boolean = runescapeNameValidator(...args);
  if (nameCheck === false) return msg.channel.send('Invalid username');
  const keyword: string = argsToString(...args);
  const embed: Embed = new Embed().setFooter(
    'Incorrect? Fetch latest names:\n.fetchrsn username'
  );
  if (keyword in playerNames) {
    const result = generateEmbed(embed, playerNames[keyword]);
    return msg.channel.send(result);
  } else {
    const isFetched: boolean = await fetchPlayerNames(msg, keyword);
    if (isFetched === true) {
      const result = generateEmbed(embed, playerNames[keyword]);
      return msg.channel.send(result);
    } else return;
  }
};

// Generate result
const generateEmbed = (inputEmbed: Embed, playerObject: PlayerNames): Embed => {
  const embed: Embed = inputEmbed;
  const aliases = playerObject.aliases;
  const names = [];
  for (const alias in aliases) {
    names.push(alias);
  }
  const data = names.join('\n');
  embed.addField('Names', `${data}`);
  return embed;
};

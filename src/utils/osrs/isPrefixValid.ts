// Discord
import { Message } from 'discord.js';
// Dotenv
import dotenv from 'dotenv';
// UTILS: Embeds
import { Embed } from '../embed';

dotenv.config({ path: 'config.env' });

// Pastebins with valid boss and skill names
const BOSS_LIST: string = process.env.OSRS_BOSS_LIST as string;
const SKILL_LIST: string = process.env.OSRS_SKILL_LIST as string;

// TODO improve this
export enum PrefixCategories {
  BOSS = 'boss',
  BOSS_EDGE_CASE = 'bossedge',
  SKILL = 'skill',
  SKILL200M = '200m',
  CLUES = 'clues',
  TIME_OTHER = 'timeother',
  OTHER = 'other',
  DEFAULT = '',
}

export const isPrefixValid = (
  msg: Message,
  args: string[],
  types: string[],
  category: PrefixCategories = PrefixCategories.DEFAULT
): string | undefined => {
  const typesList: string = types.join(', ');
  if (!args.length) {
    msg.channel.send(invalidPrefixMsg(typesList, category));
    return undefined;
  }

  const parsedArgument: string = args[0]
    .replace(/\n/g, '')
    .toLowerCase()
    .trim();
  if (!args.length || !types.includes(parsedArgument)) {
    msg.channel.send(invalidPrefixMsg(typesList, category));
    return;
  }
  return parsedArgument;
};
// Generate msg
export const invalidPrefixMsg = (
  types: string[] | string,
  category: PrefixCategories = PrefixCategories.DEFAULT
): Embed => {
  let result;
  let typesList;
  if (Array.isArray(types)) typesList = types.join(', ');
  else typesList = types;
  switch (category) {
    case PrefixCategories.BOSS:
      result = `Invalid boss name. See: [Boss List](${BOSS_LIST} 'Boss List') for a list of bosses`;
      break;
    case PrefixCategories.BOSS_EDGE_CASE:
      result = `Invalid boss name or username. See: [Boss List](${BOSS_LIST} 'Boss List') for a list of bosses`;
      break;
    case PrefixCategories.SKILL:
      result = `Invalid skill name. See: [Skill List](${SKILL_LIST} 'Skill List') for a list of skills`;
      break;
    case PrefixCategories.TIME_OTHER:
      result = `Invalid ${category} type. Valid arguments: **${typesList}**`;
      break;
    case PrefixCategories.CLUES:
      result = `Invalid clue tier. Valid tiers: **${typesList}**`;
      break;
    case PrefixCategories.SKILL200M:
      result = `Invalid skill name. See: [Skill List](${SKILL_LIST} 'Skill List') for a list of skills\nNOTE: Total level is excluded for this command`;
      break;
    default:
      result = `Invalid ${category} argument. Valid arguments: **${typesList}**`;
      break;
  }

  return new Embed().setDescription(result);
};

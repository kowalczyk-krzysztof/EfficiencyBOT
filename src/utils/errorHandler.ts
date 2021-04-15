import { Message } from 'discord.js';
import dotenv from 'dotenv';
import { Embed } from './embed';

dotenv.config({ path: 'config.env' });
const env: string = process.env.NODE_ENV as string;
// TODO: Make this good
export const errorHandler = (err: any, msg: Message): Promise<Message> => {
  const embed: Embed = new Embed().setDescription(`**Error**`);
  // if (env === 'development') console.log(err);
  return msg.channel.send(embed);
};

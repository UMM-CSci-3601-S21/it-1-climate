import { WordList } from './word-list';

export interface ContextPack {

  schema: 'https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json';
  _id: string;
  name: string;
  icon: string;
  enabled: boolean;
  wordlist: Array<WordList>;
}

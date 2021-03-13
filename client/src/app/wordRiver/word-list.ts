import { Word } from './word';


export interface WordList {
  name: string;
  enabled: boolean;
  nouns: Array<Word>;
  verbs: Array<Word>;
  adjectives: Array<Word>;
  misc: Array<Word>;
}

import { WordList } from './word-list';

export interface ContextPack {
  name: string;
  icon?: string;
  enabled: boolean;
  wordLists: WordList[];
}

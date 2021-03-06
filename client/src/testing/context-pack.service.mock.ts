import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ContextPack } from '../app/wordRiver/context-pack';
import { ContextPackService } from '../app/wordRiver/context-pack.service';
import { WordList } from '../app/wordRiver/word-list';

@Injectable()
export class MockCPService extends ContextPackService {
    static testList: Array<WordList> = [{
      name: 'Langley',
      enabled: true,
      nouns: [
        {
          word: 'Joker',
          forms: [
            'Joker'
          ]
        },
        {
          word: 'villain',
          forms: [
            'villain, villains'
          ]
        }
      ],
      verbs: [
        {
          word: 'fly',
          forms: [
            'fly',
            'flown',
            'flew'
          ]
        },
        {
          word: 'dance',
          forms: [
            'dance',
            'danced'
          ]
        },
        {
          word: 'steal',
          forms: [
            'steal',
            'stole'
          ]
        },
        {
          word: 'laugh',
          forms: [
            'laugh',
            'laughed',
            'laughing'
          ]
        },
        {
          word: 'hide',
          forms: [
            'hide',
            'hid',
            'hiding'
          ]
        }
      ],
      adjectives: [
        {
          word: 'evil',
          forms: [
            'evil'
          ]
        },
        {
          word: 'sad',
          forms: [
            'sad'
          ]
        }
      ],
      misc: [
        {
          word: 'the',
          forms: [
            'the'
          ]
        }
      ]
    }
    ];
    static testCPs: ContextPack[] = [
        {
            _id: 'meow',
            schema: 'https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json',
            name: 'felines',
            icon: 'image.png',
            enabled: false,
            wordlist: MockCPService.testList,
        },
        {
            _id: 'woof',
            schema: 'https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json',
            name: 'canines',
            icon: 'https://can-do-canines.org/wp-content/uploads/2018/01/admin-ajax.jpg',
            enabled: true,
            wordlist: MockCPService.testList,
        },
        {
            _id: 'moo',
            schema: 'https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json',
            name: 'bovines',
            icon: 'image.png',
            enabled: true,
            wordlist: MockCPService.testList,
        }
    ];
    constructor() {
      super(null);
    }

    getPacks(): Observable<ContextPack[]> {
        return of(MockCPService.testCPs);
    }

    getPack(id: string): Observable<ContextPack> {
      if (id === MockCPService.testCPs[0]._id) {
          return of(MockCPService.testCPs[0]);
      } else if (id === MockCPService.testCPs[1]._id) {
          return of(MockCPService.testCPs[1]);
      } else if (id === MockCPService.testCPs[2]._id) {
          return of(MockCPService.testCPs[2]);
      }
      else {
          return of(null);
      }
  }
}

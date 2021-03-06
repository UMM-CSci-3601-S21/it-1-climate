import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ContextPack } from './context-pack';
import { ContextPackService } from './context-pack.service';
import { WordList } from './word-list';
import { Word } from './word';

describe('ContextPackService', () => {
  const testWord: Word = {
    word: 'car',
    forms: ['car', 'cars']
  };
  const testList: Array<WordList> = [
    {
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
            'villain', 'villains'
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
  const testCPs: ContextPack[] = [
    {
      _id: 'meow',
      schema: 'https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json',
      name: 'felines',
      icon: '',
      enabled: false,
      wordlist: testList
    },
    {
      _id: 'woof',
      schema: 'https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json',
      name: 'canines',
      icon: '',
      enabled: true,
      wordlist: testList
    },
    {
      _id: 'moo',
      schema: 'https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json',
      name: 'bovines',
      icon: '',
      enabled: true,
      wordlist: testList
    }
  ];
  let service: ContextPackService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ContextPackService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPacks() should call api/packs', () => {
    service.getPacks().subscribe(
      packs => expect(packs).toBe(testCPs)
    );
  });

  it('getPackById() calls api/packs/id', () => {
    const targetPack: ContextPack= testCPs[1];
    const targetId: string = targetPack._id;

    service.getPack(targetId).subscribe(
      pack => expect(pack).toBe(targetPack)
    );
  });

  it('addPack() posts to api/packs', () => {
    service.addPack(testCPs[2]).subscribe(
      id => expect(id).toBe('test')
    );

    const req = httpTestingController.expectOne(service.contextPackUrl);

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(testCPs[2]);

    req.flush({id: 'test'});
  });

  it('addWordList() returns the right id', () => {
    service.addWordList(testList[0]).subscribe(
      id => expect(id).toBe('woof')
    );
  });

  it('addWord() returns the right id', () => {

    service.addWord(testWord).subscribe(
      id => expect(id).toBe('woof')
    );
  });


});

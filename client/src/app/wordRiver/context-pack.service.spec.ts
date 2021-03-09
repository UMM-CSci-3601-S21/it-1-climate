import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ContextPack } from './context-pack';
import { ContextPackService } from './context-pack.service';
import { WordList } from './word-list';
import { Word } from './word';

describe('ContextPackService', () => {
  const testList: Array<WordList> = []; // Replace this with an actual word list later
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

    service.getPackById(targetId).subscribe(
      pack => expect(pack).toBe(targetPack)
    );
  });
});

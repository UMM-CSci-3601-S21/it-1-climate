import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ContextPack } from '../app/wordRiver/context-pack';
import { ContextPackService } from '../app/wordRiver/context-pack.service';
import { WordList } from '../app/wordRiver/word-list';

@Injectable()
export class MockCPService extends ContextPackService {
    static testList: Array<WordList> = [];
    static testCPs: ContextPack[] = [
        {
            _id: 'meow',
            schema: 'https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json',
            name: 'felines',
            icon: 'image.png',
            enabled: false,
            wordlist: MockCPService.testList
        },
        {
            _id: 'woof',
            schema: 'https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json',
            name: 'canines',
            icon: 'image.png',
            enabled: true,
            wordlist: MockCPService.testList
        },
        {
            _id: 'moo',
            schema: 'https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json',
            name: 'bovines',
            icon: 'image.png',
            enabled: true,
            wordlist: MockCPService.testList
        }
    ];
    constructor() {
        super(null);
    }

    getPacks(): Observable<ContextPack[]> {
        return of(MockCPService.testCPs);
    }

    getPacksByID(id: string): Observable<ContextPack> {
        if (id === MockCPService.testCPs[0]._id) {
            return of(MockCPService.testCPs[0]);
        }
        else {
            return of(null);
        }
    }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpCardComponent } from './cp-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { WordList } from '../word-list';

describe('CpCardComponent', () => {
  let cpCard: CpCardComponent;
  let fixture: ComponentFixture<CpCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatCardModule
      ],
      declarations: [ CpCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    const testList: Array<WordList> = [];
    fixture = TestBed.createComponent(CpCardComponent);
    cpCard = fixture.componentInstance;
    cpCard.contextPack = {
      _id: 'woof',
      schema: 'https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json',
      name: 'canines',
      icon: 'image.png',
      enabled: true,
      wordlist: testList
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(cpCard).toBeTruthy();
  });
});

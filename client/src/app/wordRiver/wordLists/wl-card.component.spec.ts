import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';

import { WlCardComponent } from './wl-card.component';


describe('WlCardComponent', () => {
  let wlCard: WlCardComponent;
  let fixture: ComponentFixture<WlCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatCardModule
      ],
      declarations: [ WlCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WlCardComponent);
    wlCard = fixture.componentInstance;
    wlCard.wordList= {
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
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(wlCard).toBeTruthy();
  });
});

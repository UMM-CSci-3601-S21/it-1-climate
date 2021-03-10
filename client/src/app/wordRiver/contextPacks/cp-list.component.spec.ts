import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

import { CpListComponent } from './cp-list.component';
import { CpCardComponent } from './cp-card.component';
import { MockCPService } from 'src/testing/context-pack.service.mock';
import { ContextPackService } from '../context-pack.service';
import { ContextPack } from '../context-pack';

const COMMON_IMPORTS: any[] = [
  FormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule,
  MatInputModule,
  MatExpansionModule,
  MatTooltipModule,
  MatListModule,
  MatDividerModule,
  MatRadioModule,
  MatIconModule,
  BrowserAnimationsModule,
  RouterTestingModule,
];

describe('CpListComponent', () => {
  let cpList: CpListComponent;
  let fixture: ComponentFixture<CpListComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [ CpListComponent, CpCardComponent ],
      providers: [{ provide: ContextPackService, useValue: new MockCPService() }]
    });
  });

  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(CpListComponent);
      cpList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('contains all the packs', () => {
    expect(cpList.contextPacks.length).toBe(3);
  });

  it('contains a pack named "canines"', () => {
    expect(cpList.contextPacks.some((pack: ContextPack) => pack.name === 'canines')).toBe(true);
  });

  it('contains two packs that are enabled', () => {
    expect(cpList.contextPacks.filter((pack: ContextPack) => pack.enabled === true).length).toBe(2);
  });

  it('should create', () => {
    expect(cpList).toBeTruthy();
  });
});

describe('Misbehaving Context Pack List', () => {
  let cpList: CpListComponent;
  let fixture: ComponentFixture<CpListComponent>;
  let cpServiceStub: {
     getPacks: () =>  Observable<ContextPack[]>;
  };

  beforeEach(() =>  {
    // Stub Context-Pack service for test purposes
    cpServiceStub = {
      getPacks: () => new Observable(observer => {
         observer.error('Error-prone observable');
      })
    };

    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations:  [CpListComponent],
      providers: [{provide: ContextPackService, useValue: cpServiceStub}]
    });
  });

  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(CpListComponent);
      cpList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('generates an error if we don\'t set up a ContextPackService', () => {
    expect(cpList.contextPacks).toBeUndefined();
  });
});


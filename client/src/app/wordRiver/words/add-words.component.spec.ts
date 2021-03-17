import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, AbstractControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { AddWordsComponent } from './add-words.component';
import { MockCPService } from 'src/testing/context-pack.service.mock';
import { ContextPackService } from '../context-pack.service';

describe('AddWordsComponent', () => {
  let addWordsComponent: AddWordsComponent;
  let addWordForm: FormGroup;
  let fixture: ComponentFixture<AddWordsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      declarations: [ AddWordsComponent ],
      providers: [{ provide: ContextPackService, useValue: new MockCPService() }]
    })
    .compileComponents().catch(error => {
      expect(error).toBeNull();
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWordsComponent);
    addWordsComponent = fixture.componentInstance;
    addWordsComponent.ngOnInit();
    fixture.detectChanges();
    addWordForm = addWordsComponent.addWordForm;
    expect(addWordForm).toBeDefined();
    expect(addWordForm.controls).toBeDefined();
  });

  it('should create', () => {
    expect(addWordsComponent).toBeTruthy();
    expect(addWordForm).toBeTruthy();
  });

  it('form should be invalid when empty', ()=> {
    expect(addWordForm.valid).toBeFalsy();
  });

  describe('The word field', () => {
    let wordControl: AbstractControl;

    beforeEach(() => {
      wordControl = addWordsComponent.addWordForm.controls.word;
    });

    it('should not allow empty words', () => {
      wordControl.setValue('');
      expect(wordControl.valid).toBeFalsy();
    });

    it('should be fine with "superhero"', () => {
      wordControl.setValue('superhero');
      expect(wordControl.valid).toBeTruthy();
    });

    it('should fail on really long words', () => {
      wordControl.setValue('x'.repeat(100));
      expect(wordControl.valid).toBeFalsy();
      expect(wordControl.hasError('maxlength')).toBeTruthy();
    });

    it('should allow digits in the word', () => {
      wordControl.setValue('n00b');
      expect(wordControl.valid).toBeTruthy();
    });
  });

  describe('separateForms()', () => {

    it('should correctly separate an string of words into an array', () => {
      const finalArray = ['bus', 'buses'];

      const ourArray = addWordsComponent.separateForms('bus, buses');

      expect(finalArray).toEqual(ourArray);

    });
  });
});

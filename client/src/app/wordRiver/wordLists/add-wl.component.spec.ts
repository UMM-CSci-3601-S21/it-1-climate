import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, AbstractControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { AddWlComponent } from './add-wl.component';
import { MockCPService } from '../../../testing/context-pack.service.mock';
import { ContextPackService } from '../context-pack.service';

describe('AddWlComponent', () => {
  let addWordList: AddWlComponent;
  let addWordListForm: FormGroup;
  let fixture: ComponentFixture<AddWlComponent>;

  beforeEach(waitForAsync( () => {
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
      declarations: [ AddWlComponent ],
      providers: [{ provide: ContextPackService, useValue: new MockCPService() }]
    })
    .compileComponents().catch(error => {
      expect(error).toBeNull();
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWlComponent);
    addWordList = fixture.componentInstance;
    addWordList.ngOnInit();
    fixture.detectChanges();
    addWordListForm = addWordList.addWordListForm;
    expect(addWordListForm).toBeDefined();
    expect(addWordListForm.controls).toBeDefined();
  });

  it('should create', () => {
    expect(addWordList).toBeTruthy();
    expect(addWordListForm).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(addWordListForm.valid).toBeFalsy();
  });

  describe('The name field', () => {
    let nameControl: AbstractControl;

    beforeEach(() => {
      nameControl = addWordList.addWordListForm.controls.name;
    });

    it('should not allow empty names', () => {
      nameControl.setValue('');
      expect(nameControl.valid).toBeFalsy();
    });

    it('should be fine with "Avengers"', () => {
      nameControl.setValue('Avengers');
      expect(nameControl.valid).toBeTruthy();
    });

    it('should fail on really long names', () => {
      nameControl.setValue('x'.repeat(100));
      expect(nameControl.valid).toBeFalsy();
      expect(nameControl.hasError('maxlength')).toBeTruthy();
    });

    it('should allow digits in the name', () => {
      nameControl.setValue('Iron Man 2');
      expect(nameControl.valid).toBeTruthy();
    });
  });

  describe('The enabled field', () => {
    let enabledControl: AbstractControl;

    beforeEach(() => {
      enabledControl = addWordList.addWordListForm.controls.enabled;
    });

    it('should not allow empty fields', () => {
      enabledControl.setValue('');
      expect(enabledControl.valid).toBeFalsy();
    });

    it('should be fine with "true"', () => {
      enabledControl.setValue('true');
      expect(enabledControl.valid).toBeTruthy();
    });

    it('should be fine with "false"', () => {
      enabledControl.setValue('false');
      expect(enabledControl.valid).toBeTruthy();
    });

    it('should fail on status that are not either "true" or "false"', () => {
      enabledControl.setValue('nOtAbOoLeAn');
      expect(enabledControl.valid).toBeFalsy();
      expect(enabledControl.hasError('pattern')).toBeTruthy();
    });
  });
});

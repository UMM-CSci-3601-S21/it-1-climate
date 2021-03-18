import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Word } from '../word';
import { ContextPackService } from '../context-pack.service';



@Component({
  selector: 'app-add-words',
  templateUrl: './add-words.component.html',
  styleUrls: ['./add-words.component.scss']
})
export class AddWordsComponent implements OnInit {

  addWordForm: FormGroup;

  word: Word;

  addWordValidationMessages = {
    word: [
      {type: 'required', message: 'A word is required'},
      {type: 'maxlength', message: 'The word cannot exceed 20 characters'}
    ]
  };

  constructor(private fb: FormBuilder, private cpService: ContextPackService,
    private snackBar: MatSnackBar, private router: Router) { }


  ngOnInit(): void {
    this.createForms();
  }

  createForms() {
    this.addWordForm = this.fb.group({
      word: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(20),
      ])),

      forms: new FormControl('', Validators.compose([ ]))
    });
  }
  submitForm(){
    try{
    const realForm = this.separateForms(this.addWordForm.value.forms);
    this.addWordForm.value.forms = realForm;
    console.log(this.addWordForm.value.forms);
    this.cpService.addWord(this.addWordForm.value).subscribe(newID => {
      this.snackBar.open('Added ' + this.addWordForm.value.word + ' successfully', null, {
        duration: 2000,
      });
    }, err => {
      console.log(err);
      this.snackBar.open('Failed to add the word', 'OK', {
        duration: 5000,
      });
    });
  }
  catch{
  }
}

  separateForms(forms: string): Array<string> {
    let form = '';
    const trimmed = forms.trim();
    const allForms = new Array<string>();
    for(let i = 0; i < trimmed.length; i++) {
      if(trimmed.substring(i, i + 1) === ',') {
        allForms.push(form);
        form = '';
      }else if(trimmed.substring(i, i + 1) === ' ' && trimmed.substring(i - 1, i) === ',') {
      }
      else{
      form = form + trimmed.substring(i, i + 1);
      console.log(form);
      }
    }
    if( form !== '') {
      allForms.push(form);
    }
    return allForms;
  }

}


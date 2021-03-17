import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
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
    const realForm = this.separateForms(this.addWordForm.value.forms);
    this.addWordForm.value.forms = realForm;
    console.log(this.addWordForm.value.forms);
    this.cpService.addWord(this.addWordForm.value).subscribe(newID => {
      this.snackBar.open('Added ' + this.addWordForm.value.word + ' successfully', null, {
        duration: 2000,
      });
      //this.router.navigate(['/packs/', newID]);
    }, err => {
      console.log(err);
      this.snackBar.open('Failed to add the word', 'OK', {
        duration: 5000,
      });
    });
  }

  separateForms(forms: string): Array<string> {
    let form = '';
    const allForms = new Array<string>();
    for(let i = 0; i < forms.length; i++) {
      if(forms.substring(i, i + 1) === ',') {
        allForms.push(form);
        form = '';
      }else if(forms.substring(i, i + 1) === ' ') {
      }
      else{
      form = form + forms.substring(i, i + 1);
      console.log(form);
      }
    }
    allForms.push(form);
    return allForms;
  }

}


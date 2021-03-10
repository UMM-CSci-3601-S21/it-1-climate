import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ContextPack } from '../context-pack';
import { ContextPackService } from '../context-pack.service';

@Component({
  selector: 'app-add-cp',
  templateUrl: './add-cp.component.html',
  styleUrls: ['./add-cp.component.scss']
})
export class AddCpComponent implements OnInit {

  addContextPackForm: FormGroup;

  contextPack: ContextPack;

  addCpValidationMessages = {
    name: [
      {type: 'required', message: 'A name is required'},
      {type: 'maxlength', message: 'The name cannot exceed 50 characters'},
      {type: 'existingName', message: 'This name has already been taken'}
    ],

    icon: [
      {type: 'required', message: 'An icon is required'},
      {type: 'fileType', message: 'The file must be a valid type (.png or .jpg)'}
    ],

    enabled: [
      {type: 'required', message: 'You must specify whether the pack is enabled or disabled'},
    ]
  };

  constructor(private fb: FormBuilder, private cpService: ContextPackService, private snackBar: MatSnackBar, private router: Router) { }

  // edit based on what we decide as a team
  createForms() {
    this.addContextPackForm = this.fb.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        // insert check for whether the name already exists
      ])),

      icon: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('.+\.(png|jpg)$')
      ])),

      enabled: new FormControl('', Validators.compose([
        Validators.required, // decide how we want to display this option
        Validators.pattern('^(true|false)$'),
      ]))
    });
  }

  ngOnInit(): void {
    this.createForms();
  }

  submitForm() {
    this.cpService.addPack(this.addContextPackForm.value).subscribe(newID => {
      this.snackBar.open('Added the ' + this.addContextPackForm.value.name + ' context pack successfully', null, {
        duration: 2000,
      });
      this.router.navigate(['/packs/', newID]);
    }, err => {
      this.snackBar.open('Failed to add the context pack', 'OK', {
        duration: 5000,
      });
    });
  }

}

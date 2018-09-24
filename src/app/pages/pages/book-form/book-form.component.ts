import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Book} from '../../../../shared/models/book';

@Component({
  selector: 'app-bookForm',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  book: Book;


  constructor() { }

  ngOnInit() {
    this.bookForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
    });
    this.bookForm.valueChanges.subscribe(value => {
      this.book = value;
    });
  }

  sendBook(){

  }

}

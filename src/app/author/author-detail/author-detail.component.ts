import { Component, OnInit } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { Author } from '../author-core/author.model';
import { AuthorService } from '../author-core/author.service';
import { AuthenticationService } from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss']
})
export class AuthorDetailComponent implements OnInit {

  public authorForm:FormGroup;
  public author: Author;
  public user: any;
  public count: number;
  public id: string;

  isLoading: boolean;

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService:AuthenticationService
  ) {

    this.route.firstChild.firstChild.params
    .subscribe(params => {
      this.id = params['id'];
    });

    this.user = this.authenticationService.user;
    this.author = new Author()

    this.createForm();
  }

  ngOnInit() {
    this.isLoading = true;
    if (this.id && this.id !== 'new') {
      this.authorService.get(this.id)
        .pipe(finalize(() => { this.isLoading = false; }))
        .subscribe((body:any) => {
          this.author = new Author(body);
          this.updateForm();
        });
    }
  }

  createForm() {
    this.authorForm = this.formBuilder.group({
      name: new FormControl({ value: this.author.name, disabled: false}, Validators.required),
      email: new FormControl({ value: this.author.email, disabled: false}, Validators.required),
      password: new FormControl({ value: this.author.password, disabled: false}, Validators.required),
      picture: new FormControl({ value: this.author.picture, disabled: false}),
      role: new FormControl({ value: this.author.role, disabled: false}),
    });
  }

  updateForm() {
    this.authorForm.patchValue({
      name: this.author.name,
      email: this.author.email,
      password: this.author.password,
      picture: this.author.picture,
      role: this.author.role,
    });
  }

  save () {
    this.author.name = this.authorForm.value.name;
    this.author.email = this.authorForm.value.email;
    this.author.password = this.authorForm.value.password;
    this.author.picture = this.authorForm.value.picture;
    this.author.role = this.authorForm.value.role;

    this.isLoading = true;

    if (this.author.id) {
      this.authorService.update(this.author)
        .pipe(finalize(() => { this.isLoading = false; }))
        .subscribe((body:any) => {
          this.author = new Author(body);
        });
    } else {
      this.authorService.create(this.author)
        .pipe(finalize(() => { this.isLoading = false; }))
        .subscribe((body:any) => {
          this.author = new Author(body);
          //this.router.navigate(['/authors']);
        });
    }


  }
}

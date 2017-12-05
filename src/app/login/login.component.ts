import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, Platform } from 'ionic-angular';
import { finalize } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Logger } from '../core/logger.service';
import { I18nService } from '../core/i18n.service';
import { AuthenticationService } from '../core/authentication/authentication.service';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  version: string = environment.version;
  error: string = null;
  loginForm: FormGroup;

  constructor(private router: Router,
              private http: Http,
              private formBuilder: FormBuilder,
              private platform: Platform,
              private loadingController: LoadingController,
              private i18nService: I18nService,
              private authenticationService: AuthenticationService) {
    this.createForm();
  }

  ngOnInit() { }

  login() {
    const loading = this.loadingController.create();
    let credentials = this.loginForm.value;

    loading.present().then(() => {
      this.http.post("/auth", {access_token: btoa(credentials.username + ":" + credentials.password)})
      .pipe(finalize(() => {
        this.loginForm.markAsPristine();
        loading.dismiss();
      }))
      .subscribe((res:Response) => {
        let body:any = JSON.parse(res.text());
        credentials.token = body.token;
        credentials.user = body.user;
        this.authenticationService.login(credentials)
          .pipe(finalize(() => {
            this.loginForm.markAsPristine();
            loading.dismiss();
          }))
          .subscribe((credentials) => {
            log.debug(`${credentials.user.email} successfully logged in`);

            this.router.navigate(['/home'], { replaceUrl: true });
          }, error => {
            log.debug(`Login error: ${error}`);
            this.error = error;
          });
      }, error => {
        log.debug(`Login error: ${error}`);
        this.error = error;
      });
    })
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get isWeb(): boolean {
    return !this.platform.is('cordova');
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['firat@dbcook.com', Validators.required],
      password: ['frtkrdg', Validators.required],
      remember: true
    });
  }

}

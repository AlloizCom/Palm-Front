import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {UserDetailsService} from '../../../../shared/service/user-details.service';
import {LoginService} from '../../../../shared/service/login.service';
import {User} from "../../../../shared/models/user";
import {Subject} from "rxjs/Subject";
import {isNullOrUndefined} from "util";
import {UserService} from "../../../../shared/service/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService,LoginService]
})
export class LoginComponent implements OnInit {
  user: User = new User();
  loginForm: FormGroup;
  @ViewChild('check') check: ElementRef;
  badPass: boolean = false;
  private _canAuth = new Subject<boolean>();
  private canAuth$ = this._canAuth.asObservable();

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router,
              private _userService: UserService,
              private _loginService: LoginService,
              private _userDetailsService: UserDetailsService) {
    localStorage.clear();
    sessionStorage.clear();
    this._userDetailsService.logout();
    this.withParams();
  }

  auth() {
    console.log(this.user);
    console.log('AUTH SIKA');
    this._loginService.sendCredentials(this.user).subscribe(next => {
      console.log('sendCredentials - ', next);
      console.log(this.check.nativeElement.checked );
      if (this.check.nativeElement.checked == true) {
        console.log('nativeElement.checked == true');
        this._userDetailsService.tokenParseInLocalStorage(next);
        this._userService.getU().subscribe(next => {
          this._userDetailsService.loginWithLocal(next);
          this._router.navigateByUrl('/cabinet');
        });
      } else if (this.check.nativeElement.checked == false) {
        console.log('nativeElement.checked == false');
        this._userDetailsService.tokenParseInSessionStorage(next);
        this._userService.getU().subscribe(next => {
          this._userDetailsService.loginWithSession(next);
          this._router.navigateByUrl('/cabinet');
        });
      }
    }, error => {
      console.error(error);
      this.badPass = true;
    });
  }

  checkValidity() {
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.loginForm.valueChanges.subscribe(next => {
      this.user = next;
    });
  }

  withParams() {
    this._activatedRoute.params.subscribe(param => {
      if ((!isNullOrUndefined(param['login'])) && (!isNullOrUndefined(param['password']))) {
        this.canAuth$.subscribe(next => {
          this.user.login = param['login'];
          this.user.password = param['password'];
          this.auth();
        });
      } else {

      }
    });
  }

  ngOnInit() {
    this.checkValidity();
  }

  ngAfterViewInit(): void {
    this._canAuth.next(true);
  }
}

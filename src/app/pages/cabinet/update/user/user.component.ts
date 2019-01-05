import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../../shared/service/user.service';
import {UserDetailsService} from '../../../../../shared/service/user-details.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  password: string = '';

  constructor(private _userService: UserService, private _userDetails: UserDetailsService) {

  }

  update() {
    if (this.password.length < 6) {
      alert('Password must be at least 6 symbols length!');
      return;
    } else if (!this.password.match(/^(\w*\d*)+$/)) {
      alert('Password must contain latin symbols and numbers and nothing else!');
      return;
    }
    this._userDetails.user.password = this.password;
    this._userService.updatePassword(this._userDetails.user)
      .subscribe(arg => this._userDetails.updateUser(arg));

  }

  ngOnInit() {
  }

}

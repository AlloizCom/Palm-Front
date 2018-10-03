import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../shared/service/user.service";
import {User} from "../../../../shared/models/user";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
  providers:[UserService]
})
export class UpdateComponent implements OnInit {

  user: User = new User();
  constructor(_userService: UserService) {
    _userService.getU().subscribe(next => {
      this.user = next;
    });
  }

  disabling: boolean = true;

  disablings() {
    if(this.user.role == 'ADMIN'){
      this.disabling= false;
    }
  }

  isIn = true;

  ngOnInit() {

  }

  toggleState() { // click handler
    this.isIn = !this.isIn;
  }
}

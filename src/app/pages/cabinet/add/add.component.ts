import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../shared/service/user.service";
import {User} from "../../../../shared/models/user";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers:[UserService]
})
export class AddComponent implements OnInit {

  isIn = true;
  user: User = new User();
  constructor(_userService: UserService) {
    _userService.getU().subscribe(next => {
      this.user = next;
    });
  }

  ngOnInit() {
  }

  toggleState() { // click handler
    this.isIn = !this.isIn;
  }
}


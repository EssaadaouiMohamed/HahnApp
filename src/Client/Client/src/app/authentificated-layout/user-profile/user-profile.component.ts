import { Component, OnInit} from '@angular/core';
import { HttpService } from '../../services/http-service-provider.service';
import { UserResponse } from '../../models/userResponse';
import { AccountService } from '../../services/account.service';
import { UserService} from '../../services/user-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user!: UserResponse;
  constructor(private http: HttpService, private accountService: AccountService, private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.user = await this.userService.getById();
    } catch (error) {
      console.error(error);
    }
  }

  
}

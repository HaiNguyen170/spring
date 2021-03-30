import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  falcuty : string;
  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    if(this.currentUser.falcuty_id == 1) this.falcuty = "Software Engineering";
    else if(this.currentUser.falcuty_id == 2) this.falcuty = "International Business";
    else if(this.currentUser.falcuty_id == 3) this.falcuty = "Artificial Intelligence";
    else if(this.currentUser.falcuty_id == 4) this.falcuty = "Software Assurance";
  }
}
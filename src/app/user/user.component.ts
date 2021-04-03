import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userData: any
  constructor(private service: UserService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.listUser();
  }

  async listUser() {
    await this.service.getAllUser()
      .subscribe(
        data => {
          this.userData = data;
          if(!this.userData)
          this.showError("No data in user table ! ");
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  //Remove an element by attribute and its value
  removeByAttr(arr, attr, value) {
    var i = arr.length;
    while (i--) {
      if (arr[i]
        && arr[i].hasOwnProperty(attr)
        && (arguments.length > 2 && arr[i][attr] === value)) {

        arr.splice(i, 1);

      }
    }
    return arr;
  }

  async deleteUser(user_id) {
    if (confirm(`Are you sure to delete student have id : ${user_id}?`)) {
      await this.service.deleteUser(user_id)
        .subscribe(
          data => {
            console.log(data);
            if (data == null) {
              this.showSuccess("Delete user successfully.")
              this.userData = this.removeByAttr(this.userData, 'id', user_id);
            }
          },
          error => {
            console.log(error);
            this.showError(error);
          }
        );
    }
  }

  showSuccess(content) {
    this.toastService.success(content);
  }

  showError(content) {
    this.toastService.error(content);
  }


  /*
  //1
someArray.shift(); // first element removed
//2
someArray = someArray.slice(1); // first element removed
//3
someArray.splice(0, 1); // first element removed
//4
someArray.pop(); // last element removed
//5
someArray = someArray.slice(0, a.length - 1); // last element removed
//6
someArray.length = someArray.length - 1; // last element removed*/

}

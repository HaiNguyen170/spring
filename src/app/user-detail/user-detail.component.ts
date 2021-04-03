import { Component, OnInit } from '@angular/core';
import {UserService} from 'src/app/service/user.service';
import {ActivatedRoute,Router} from '@angular/router';
import {ToastService} from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  form : any = {
    id : null,
    name : null,
    email:null,
    address:null,
    phonenumber:null,
    falcuty:1,
  }

  currentUser : any;

  constructor(private service : UserService ,private route : ActivatedRoute,private toastService : ToastService) { }

  ngOnInit(): void {
    this.getUser(this.route.snapshot.paramMap.get('id'));
  }

  getUser(id){
    this.service.getUser(id)
    .subscribe(
      data=>{
        this.currentUser = data;
        this.form.id = id;
        this.form.name = data.username;
        this.form.email = data.email;
        this.form.address = data.address;
        this.form.phonenumber = data.phonenumber;
        this.form.falcuty = data.falcuty.id;
      },
      err =>{
        console.log(err);
      });
  }
  async onSubmit(){
    const {id, name, email,address,phonenumber,falcuty } = this.form;
    let falcuty_code = "";
    if(falcuty===1) falcuty_code = "SE";
    else if(falcuty===2) falcuty_code = "IB";
    else if(falcuty===3) falcuty_code = "AI";
    else if(falcuty===4) falcuty_code = "SA";
    const data = {username : name , email : email , address : address, phonenumber:phonenumber,falcuty :falcuty_code};
    await this.service.updateUser(id,data)
    .subscribe(
      data=>{
        console.log(data);
        this.showSuccess("Update user successfully");
    },err=>{
      this.showError("Update faile : "+err);
    })
    
  }

  showSuccess(content) {
    this.toastService.success(content);
  }

  showError(content) {
    this.toastService.error(content);
  }


}

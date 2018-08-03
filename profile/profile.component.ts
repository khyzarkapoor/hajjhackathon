
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // user:Object;

  fullname:String;
  phone:String;
  email:String;
  password:String;
  user:any;
  

  constructor(private authService:AuthService, private router: Router) { }

  ngOnInit() {
    // get the user id
    const ide = localStorage.getItem('user');
    this.user = JSON.parse(ide);


    //get the user info
    this.authService.getProfile().subscribe(
      data => {
        // this.user = data.user;

        this.fullname = data.fullname;
        this.phone = data.phone;
        this.email = data.email;

        //console.log(this.user);
      },
      err => {
        console.log(err);
        return false;
      }
    );
  }

  onProfileUpdate(){
    const user = {
      id: this.user.id,
      fullname : this.fullname,
      phone : this.phone,
      email : this.email,
      password: this.password
    }

    this.authService.updateProfile(user).subscribe(data =>{
      if(data.success){
        this.authService.storeUserData(data.token,data.user);
        alert(data.msg + " Please re-login.");
        this.authService.onLogout();
        this.router.navigate(['/home/login']);

      }else{
        alert(data.msg);
      }
    });
  }

  

}

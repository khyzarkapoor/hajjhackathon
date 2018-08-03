
import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.css']
})
export class OutletComponent implements OnInit {

  email:String;
  password:String;
  qrcode:String;
  pin:String;
  amount:String='2';

  loggedout:boolean=true;
  loggedin:boolean=false;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    
    if(localStorage.getItem('outletid')!=null){
      this.loggedin = true;
      this.loggedout = false;

      this.getalltransactions();
    }
  }

  logout(){
    localStorage.removeItem('outletid');
    localStorage.removeItem('outletname');
    this.loggedin = false;
    this.loggedout = true;
  }

  sell(){
    let obj = {
      outlet:localStorage.getItem('outletid'),
      name:localStorage.getItem('outletname'),
      amount:this.amount,
      qrcode:this.qrcode,
      pin:this.pin
    };

    this.authService.registertransaction(obj).subscribe(data=>{
      if(data.success){
        alert('Successfull');
        location.reload();
      }else{
        alert(data.msg);
      }
      console.log(data);
    });
    
    
  }

  login(){
    const obj = {
      email:this.email,
      password:this.password
    };

    this.authService.getfood(JSON.stringify(obj)).subscribe(data=>{
      if(data.success){
        // console.log(data);
        
        localStorage.setItem('outletid',data.outlet._id);
        localStorage.setItem('outletname',data.outlet.name);
        this.loggedin = true;
        this.loggedout = false;

      }else{
        alert('Email/Password mismatch!');
        this.loggedin = false;
        this.loggedout = true;
      }
    });
  }

  transactionsArr:any[]=[];
  getalltransactions(){
    this.authService.gettransactionsoutlet(localStorage.getItem('outletid')).subscribe(data=>{
      if(data.success){
        this.transactionsArr = data.data;
        //console.log(this.transportArr);
      }
    });
  }

}

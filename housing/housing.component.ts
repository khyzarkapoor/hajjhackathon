
import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-housing',
  templateUrl: './housing.component.html',
  styleUrls: ['./housing.component.css']
})
export class HousingComponent implements OnInit {

  name:String;
  occupancy:String;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.getalltents();
  }

  register(){
    const obj = {
      name:this.name,
      occupancy:this.occupancy,
      createdby:this.authService.getSavedEmail()
    };

    this.authService.registertent(obj).subscribe(data=>{
      if(data.success){
        console.log(data.tent);
        this.getalltents();
      }else{
        alert('Try with other name for this tent. Already Present');
      }
    });
  }

  tentsArr:any[]=[];
  getalltents(){
    this.authService.getalltents(this.authService.getSavedEmail()).subscribe(data=>{
      if(data.success){
        this.tentsArr = data.data;
        console.log(this.tentsArr);
        
      }
    });
  }

}

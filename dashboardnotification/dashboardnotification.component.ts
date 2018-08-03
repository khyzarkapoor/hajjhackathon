
import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../services/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboardnotification',
  templateUrl: './dashboardnotification.component.html',
  styleUrls: ['./dashboardnotification.component.css']
})
export class DashboardnotificationComponent implements OnInit {
    // Doughnut
    // public doughnutChartLabels:string[] = ['Sent', 'Seen','Reported'];
    // public doughnutChartData:number[] = [350, 450,100];

     doughnutChartLabels:string[] = ['Sent', 'Seen', 'Ack' ,'Reported'];
     doughnutChartData:number[] = [];
    public doughnutChartType:string = 'doughnut';
   
  notificationsArr:any[]=[];
  tempArr:any[]=[];
  payloadArr:any[]=[];

  sent:number=0;
  mastersent:number=0;
  seen:number=0;
  masterseen:number=0;
  ack:number=0;
  masterack:number=0;
  reported:number=0;
  masterreported:number=0;


  constructor(private authService:AuthService, private notificationService:NotificationService,private router:Router) { }



  ngOnInit() {
    this.getallnotifications();
  }


  newnotificationsArr:any[]=[];
  getallnotifications(){
    this.notificationService.getallnotificaitons(this.authService.getSavedEmail())
    .subscribe(data=>{
      // console.log(data);
      
      if(data.success){

        console.log(data.data);
        this.newnotificationsArr = data.data;
        
      }else{
        console.log("No notifications found.");
      }
    });
  }

  getseen(notifications){
    var count = 0;
    notifications.forEach(element => {
      if(element.seen != '0'){
        count++;
      }
    });
    return count;
  }

  getackd(notifications){
    var count = 0;
    notifications.forEach(element => {
      if(element.ack != '0'){
        count++;
      }
    });
    return count;
  }

  getreported(notifications){
    var count = 0;
    notifications.forEach(element => {
      if(element.reported != '0'){
        count++;
      }
    });
    return count;
  }


  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
  
  public chartHovered(e:any):void {
    console.log(e);
  }

  reportedclick(id){
    this.router.navigate(['/notification/reported'], { queryParams: { notificationid: id } });
  }
  
}

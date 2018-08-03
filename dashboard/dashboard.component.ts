
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MessagingService} from '../../services/messaging.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  doughnutChartLabels:string[] = ['Quick', 'Bulk', 'Drip'];
  doughnutChartData:number[] = [];
 public doughnutChartType:string = 'doughnut';






  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [65, 59, 80, 40, 56, 55, 55], label: 'Quick'},
    {data: [28, 48, 40, 19, 86, 40, 27], label: 'Bulk'},
    {data: [28, 65, 40, 80, 86, 27, 48], label: 'Drip/Quick'},
    {data: [28, 48, 40, 19, 86, 27, 19], label: 'Drip/Bulk'}
  ];
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  selfemail:String="";


  constructor(private auth:AuthService, private msgService:MessagingService) { }

  ngOnInit() {
    this.selfemail = this.auth.getSavedEmail();
    this.getallchilds();
  }



  childchange(ev){
    console.log(ev.target.value);
    this.geteverything(ev.target.value);
  }


  geteverything(email){
    this.quickArr = [];
    this.bulkArr = [];
    this.dripArr = [];
    this.doughnutChartData = [];

    this.msgService.getallquick(email).subscribe(data=>{
      
        this.quickArr = data.data;
        this.msgService.getallbulk(email).subscribe(data=>{
          
            this.bulkArr = data.data;
            this.msgService.getalldrip(email).subscribe(data=>{
              
                this.dripArr = data.data;

                

                //this.doughnutChartLabels.push('Quick');
                this.doughnutChartData.push(this.quickArr.length);
                //this.doughnutChartLabels.push('Bulk');
                this.doughnutChartData.push(this.bulkArr.length);
                //this.doughnutChartLabels.push('Drip');
                this.doughnutChartData.push(this.dripArr.length);

            });

        });

    });
  }













  childsArr:any[]=[];
  getallchilds(){
    this.auth.getChildAccess(this.auth.getSavedEmail()).subscribe(data=>{
      if(data.data.length>0){
        //console.log(data.data);
        
        this.childsArr = data.data;
        //console.log(this.ops);
        console.log(this.childsArr);
        
        
      }else{
        console.log('No Childs');
      }
    });
  }

  quickArr:any[]=[];
  getallquick(){
    this.msgService.getallquick(this.auth.getSavedEmail()).subscribe(data=>{
      if(data.data.length>0){
        //console.log(data.data);
        
        this.quickArr = data.data;
        //console.log(this.ops);
        
      }else{
        console.log('No Quick Messages');
      }
    });
  }    

  bulkArr:any[]=[];
  getallbulk(){
    this.msgService.getallbulk(this.auth.getSavedEmail()).subscribe(data=>{
      if(data.data.length>0){
        // console.log(data.data);
        
        
        this.bulkArr = data.data;
        //console.log(this.ops);
        

      }else{
        console.log('No Bulk Messages');
      }
    });
  }    

  dripArr:any[]=[]
  getalldrip(){
    this.msgService.getalldrip(this.auth.getSavedEmail()).subscribe(data=>{
      if(data.data.length>0){
        
        
        this.dripArr = data.data;
        //console.log(this.ops);
        // console.log(this.dripArr.length);
        
      }else{
        console.log('No Bulk Messages');
      }
    });
  }    



}

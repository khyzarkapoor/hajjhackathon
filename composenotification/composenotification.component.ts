
import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../services/notification.service';
import {ContactService} from '../../services/contact.service';

@Component({
  selector: 'app-composenotification',
  templateUrl: './composenotification.component.html',
  styleUrls: ['./composenotification.component.css']
})
export class ComposenotificationComponent implements OnInit {

  preference:String;
  topic:String;
  name:String;
  category:String;
  language:String;
  message:String="";
  createdby:String;

  spinner:boolean;

  messagelen:Number;

  btndis:boolean;

  preferenceselected:Boolean;

  templatesArr:any[]=[];
  tokensArr:any[]=[];
  groupid:String="";

  constructor(private authService:AuthService, private notificationService:NotificationService, private contactService:ContactService) { }

  ngOnInit() {
    this.messagelen = this.message.length;
    this.getallgroups();
  }


  groupchange(event){
    this.groupid = event.target.value;
    console.log(this.groupid);
    this.contactService.getgroupcontacts(this.groupid).subscribe(data=>{
      if(data.success){
        this.tokensArr = data.tokens;
        console.log(this.tokensArr);
      }else{
        alert('No Tokens found for this group');
      }
    });
  }


  groupsArr:any[]=[];
  getallgroups(){
    this.contactService.getallgroups(this.authService.getSavedEmail()).subscribe(data=>{
      if(data.success){
        this.groupsArr = data.data;
        console.log(this.groupsArr);
      }else{
        alert('nothing found');
      }
    });
  }


  register(){
    this.spinner = true;
    this.btndis = true;

    let campaign = {
      name:this.name,
      message:this.message,
      tokens:this.tokensArr,
      createdby:this.authService.getSavedEmail()
    };

    this.notificationService.registerNotificationCampaign(campaign).subscribe(data=>{
      if(data.success){
        // console.log(data);
        alert("Campaign successfully created.");
        location.reload(true);
      }else{
        alert("Not created. Try another name.");
        this.btndis = false;
      }
      this.spinner=false;
    });
  }

  k(e){
    this.messagelen = this.message.length;
  }

}

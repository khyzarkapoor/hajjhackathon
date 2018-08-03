
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {MessagingService} from '../../services/messaging.service';
import {FileSelectDirective,FileUploader} from 'ng2-file-upload/ng2-file-upload';
import { Router } from '@angular/router';

const uri = 'http://localhost:3000/messaging/campaigns/upload';

@Component({
  selector: 'app-campaignmanagement',
  templateUrl: './campaignmanagement.component.html',
  styleUrls: ['./campaignmanagement.component.css']
})
export class CampaignmanagementComponent implements OnInit {

  path:String="";
  name:String="";
  type:String="";
  description:String="";

  public uploader:FileUploader = new FileUploader({url:uri, itemAlias:'photo'});


  constructor(private authService:AuthService, private messagingService:MessagingService, private router:Router) {

  }

  ngOnInit() {
    this.getallcampaigns();

    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {
      var resp = JSON.parse(response);
      this.path = resp.path;
      console.log("ImageUpload:uploaded:", this.path);
    }


  }

  typechange(e){

  }

  registercampaign(){
    let campaign = {
      name:this.name,
      type:this.type,
      description:this.description,
      path:this.path,
      createdby:this.authService.getSavedEmail()
    };
    //console.log(campaign);
    this.messagingService.registercampaign(campaign).subscribe(data=>{
      if(data.success){
        alert("Campaign Registered");
        location.reload();
      }else{
        alert("Not Registered")
      }
    });
    
  }


  campaignsArr:any[]=[];
  getallcampaigns(){
    this.messagingService.getallcampaigns(this.authService.getSavedEmail()).subscribe(data=>{
      if(data.success){
        this.campaignsArr=data.data;
      }else{
        console.log("Nothing found.");
        
      }
    });
  }

  removecampaign(id){
    this.messagingService.removecampaign(id).subscribe(data=>{
      if(data.success){
        alert("Successfully Removed");
        this.getallcampaigns();
      }else{
        alert("Not Removed");
      }
    });
  }

  download(path){
    window.location.href = "http://localhost:3000/messaging/campaigns/download/"+path;
      //this.router.navigateByUrl();
  }

  fileChange(ev){
    

  }




}

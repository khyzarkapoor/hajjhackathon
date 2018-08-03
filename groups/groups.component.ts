
import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ContactService} from '../../services/contact.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groupsArr:any[]=[];

  constructor(private authService:AuthService, private contactService:ContactService) { }

  ngOnInit() {
    this.getallgroups();
    //this.getGroupsWithDetails();
  }

  getallgroups(){
    this.contactService.getallgroups(this.authService.getSavedEmail()).subscribe(data=>{
      this.groupsArr = data.data;
    });
  }

  removegroup(id){
    this.contactService.removegroup(id).subscribe(data=>{
      console.log(data);
      if(data.success){
        alert("Removed");
        this.getallgroups();
      }else{
        alert("Remove error.")
      }
    });

  }

  removecontactfromgroup(cid,gid){
    //console.log(cid,gid);
    let con = {
      contactid:cid,
      groupid:gid
    };

    this.contactService.removecontactfromgroup(JSON.stringify(con)).subscribe(data=>{
      console.log(data);
      if(data.success){
        alert("Removed");
        this.getallgroups();
      }else{
        alert("Remove error.")
      }
    });

  }

  getGroupsWithDetails(){
    this.contactService.getgroupwithdetails(this.authService.getSavedEmail()).subscribe(data=>{
      //this.groupsArr = data.data;
      console.log(data);
    });
  }
  

}

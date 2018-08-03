
import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ContactService} from '../../services/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contactsArr:any[]=[];
  checkedArr:any[]=[];
  namesArr:any[]=[];

  groups:String;

  localcontact:any[]=[];

  allgroups:any[]=[];

  name:String;
  description:String;

  constructor(private authService:AuthService,private constactService:ContactService) { }

  ngOnInit() {
    this.getallcontacts();
    this.getallgroups();
  }

  getallcontacts(){
    this.authService.gethajis(this.authService.getSavedEmail()).subscribe(data=>{
      if(data.success){
        this.contactsArr = data.data;
        console.log(this.contactsArr);
      }else{
        console.log("No Hajis registered");
      }
    });
  }

  deletecontact(id){
    var check = confirm("This action will delete this contact");
    if(check){
      this.constactService.removecontact(id).subscribe(data=>{
        if(data.success){
          alert("Contact removed.")
          this.getallcontacts();
        }else{
          alert("Not removed.")
        }
      });
    }
  }

  checkchange(event,id,fullname){
    if(event.target.checked){
      this.checkedArr.push(id);
      this.namesArr.push(fullname);

      let s = {
        contact:id,
        name:fullname
      }
      
      this.localcontact.push(s);
    }
    else
    {
      let s = {
        contact:id,
        name:fullname
      }

      this.checkedArr.splice(this.checkedArr.indexOf(id),1);
      this.namesArr.splice(this.namesArr.indexOf(fullname),1);
      this.localcontact.splice(this.localcontact.indexOf(s),1);
    }
  }


  registergroup(){
    if(this.checkedArr.length>0){
      let newGroup = {
        name:this.name,
        description:this.description,
        contacts:this.localcontact,
        createdby:this.authService.getSavedEmail()
      }

      this.constactService.registergroup(newGroup).subscribe(data=>{
        if(data.success){
          alert("New Group registered.");
        }else{
          alert(data.msg);
        }
      });

    }else{
      alert("Please select contacts first");
    }
  }

  getallgroups(){
    this.constactService.getallgroups(this.authService.getSavedEmail())
    .subscribe(data=>{
      this.allgroups = data.data;
    });
  }

  updategroup(){
    if(this.checkedArr.length>0){
      let update = {
        group:this.groups,
        contacts:this.localcontact
      }

      // console.log(JSON.stringify(update));
      

      this.constactService.updategroup(update).subscribe(data=>{
        if(data.success){
          alert("Group updated.");
        }else{
          alert("Not updated.");
        }
      });
    }else{
      alert("Please select contacts to put in this group.");
    }
  }


  groupschange(event){
    this.groups = event.target.value;
  }

}

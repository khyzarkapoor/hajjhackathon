
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class NotificationService {

  constructor(private http:Http) {
   }

   registerTemplate(template){
     let headers = new Headers();
     headers.append('Content-Type','application/json');
     //since it is an obsservable so we have to map its response
     return this.http.post("http://localhost:3000/notifications/templates/register",template,{headers})
     .map(res => res.json());
   }

   getalltemplates(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/notifications/templates/"+email,{headers})
    .map(res => res.json());
  }

  removetemplate(id){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.delete("http://localhost:3000/notifications/templates/"+id,{headers})
    .map(res => res.json());
  }



  // notifications campaign
  registerNotificationCampaign(notificationcampaign){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.post("http://localhost:3000/notifications/campaigns/register",notificationcampaign,{headers})
    .map(res => res.json());
  }

  getallnotificaitons(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/notifications/"+email,{headers})
    .map(res => res.json());
  }

  getAllnotificationreported(id){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/notifications/reported/"+id,{headers})
    .map(res => res.json());
  }

}


import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthService {

  authToken:any;
  user:any;

  constructor(private http:Http) {

  }

  registerHaji(haji){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.post("http://localhost:3000/haji/register",haji,{headers})
    .map(res => res.json());
  }

  gethajis(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get("http://localhost:3000/haji/"+email,{headers})
    .map(res => res.json());
  }


  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.post("http://localhost:3000/users/register",user,{headers})
    .map(res => res.json());
  }

  loginUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post("http://localhost:3000/users/authenticate",user,{headers})
    .map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get("http://localhost:3000/users/profile",{headers})
    .map(res => res.json());
  }

  getChildAccess(val){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get("http://localhost:3000/users/childs/"+val,{headers})
    .map(res => res.json());
  }

  getRights(email){
    let headers = new Headers();
    console.log(""+ email);
    headers.append('Content-Type','application/json');
    return this.http.get("http://localhost:3000/users/rights/"+email,{headers})
    .map(res => res.json());
  }

  updateRights(rights){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.put("http://localhost:3000/users/rights",rights,{headers})
    .map(res => res.json());
  }

  updateProfile(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.put("http://localhost:3000/users/profile",user,{headers})
    .map(res => res.json());
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  storeUserData(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    localStorage.setItem("id_loggedIn","true");

    this.authToken = token;
    this.user = user;
  }

  onLogout(){
    this.authToken = null;
    this.user = null;

    localStorage.clear();
  }

  loggedIn(){
    return tokenNotExpired();
  }


  getallchilds(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get("http://localhost:3000/users/rights/"+email,{headers})
    .map(res => res.json());
  }

  // getRights(){
  //   let headers = new Headers();
  //   this.loadToken();
  //   headers.append('Authorization',this.authToken);
  //   headers.append('Content-Type','application/json');
  //   return this.http.get("http://localhost:3000/users/rights",{headers})
  //   .map(res => res.json());
  // }
  removechild(id){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.delete("http://localhost:3000/users/"+id,{headers})
    .map(res => res.json());
  }

  getSavedEmail(){
    let userstr = localStorage.getItem('user');
    let userobj = JSON.parse(userstr);
    var email = userobj.email;
    return email;
  }


// ------------------------------------------------hajjhackathon
registertent(tent){
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  //since it is an obsservable so we have to map its response
  return this.http.post("http://localhost:3000/haji/tent/register",tent,{headers})
  .map(res => res.json());
}

getalltents(email){
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.get("http://localhost:3000/haji/tent/"+email,{headers})
  .map(res => res.json());
}

registertransport(tent){
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  //since it is an obsservable so we have to map its response
  return this.http.post("http://localhost:3000/haji/transport/register",tent,{headers})
  .map(res => res.json());
}

getalltransport(email){
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.get("http://localhost:3000/haji/transport/"+email,{headers})
  .map(res => res.json());
}

registerfood(outlet){
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  //since it is an obsservable so we have to map its response
  return this.http.post("http://localhost:3000/haji/food/register",outlet,{headers})
  .map(res => res.json());
}

getallfood(email){
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.get("http://localhost:3000/haji/food/"+email,{headers})
  .map(res => res.json());
}

getfood(outlet){
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.get("http://localhost:3000/haji/food/single/"+outlet,{headers})
  .map(res => res.json());
}

registertransaction(transaction){
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  //since it is an obsservable so we have to map its response
  return this.http.post("http://localhost:3000/haji/transaction/register",transaction,{headers})
  .map(res => res.json());
}

getalltransactions()
{
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.get("http://localhost:3000/haji/transaction/all/",{headers})
  .map(res => res.json());
}

gettransactions(haji)
{
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.get("http://localhost:3000/haji/transaction/"+haji,{headers})
  .map(res => res.json());
}

gettransactionsoutlet(outlet)
{
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.get("http://localhost:3000/haji/transaction/outlet/"+outlet,{headers})
  .map(res => res.json());
}














}

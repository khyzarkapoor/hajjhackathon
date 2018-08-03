
import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import {GoogleMapsService} from 'google-maps-angular2';
import {SebmGoogleMap,SebmGoogleMapPolygon,LatLngLiteral} from 'angular2-google-maps/core';

@Component({
  selector: 'app-transport',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  name:String;
  address:String;
  phone:String;
  latitude:String;
  longitude:String;
  email:String;
  password:String;

  
  centers:Array<LatLngLiteral> = [
    { lat: 21.423190, lng: 39.827000 },
    { lat: 21.423240,  lng: 39.828095 },
    { lat: 21.422451, lng: 39.828073 },
    { lat: 21.422431, lng: 39.826936 }
  ];

  tops:Array<LatLngLiteral> = [
    { lat: 21.424109,  lng: 39.827011 },
    { lat: 21.424089,  lng: 39.828084 },
    { lat: 21.423240, lng: 39.828095 },
    { lat: 21.423190, lng: 39.827000 }
  ];

  topsleft:Array<LatLngLiteral> = [
    { lat: 21.424129,  lng: 39.825863 },
    { lat: 21.424109,  lng: 39.827011 },
    { lat: 21.423190, lng: 39.827000 },
    { lat: 21.423170, lng: 39.825874 }
  ];

  topright:Array<LatLngLiteral> = [
    { lat: 21.424089,  lng: 39.828084 },
    { lat: 21.424059,  lng: 39.829232 },
    { lat: 21.423270, lng: 39.829243 },
    { lat: 21.423240,  lng: 39.828095 }
  ];

  centerright:Array<LatLngLiteral> = [
    { lat: 21.423240,  lng: 39.828095 },
    { lat: 21.423270,  lng: 39.829243 },
    { lat: 21.422411, lng: 39.829221 },
    { lat: 21.422451, lng: 39.828073 }
  ];

  centerleft:Array<LatLngLiteral> = [
    { lat: 21.423170, lng: 39.825874 },
    { lat: 21.423190, lng: 39.827000 },
    { lat: 21.422431, lng: 39.826936 },
    { lat: 21.422481, lng: 39.825842 }
  ];

  bottom:Array<LatLngLiteral> = [
    { lat: 21.422431, lng: 39.826936 },
    { lat: 21.422451, lng: 39.828073 },
    { lat: 21.421602, lng: 39.828063 },
    { lat: 21.421632, lng: 39.826882 }
  ];

  bottomleft:Array<LatLngLiteral> = [
    { lat: 21.422481, lng: 39.825842 },
    { lat: 21.422431, lng: 39.826936 },
    { lat: 21.421632, lng: 39.826882 },
    { lat: 21.421642, lng: 39.825809 }

  ];

  bottomright:Array<LatLngLiteral> = [
    { lat: 21.422451, lng: 39.828073 },
    { lat: 21.422411, lng: 39.829221 },
    { lat: 21.421622, lng: 39.829189 },
    { lat: 21.421602, lng: 39.828063 }
  ];

  
  



  paths: Array<LatLngLiteral> = [
    { lat: 21.734809,  lng: 39.315429 },
    { lat: 21.736722,  lng: 39.373108 },
    { lat: 21.699724, lng: 39.373108 },
    { lat: 21.699724, lng: 39.316803 }
  ];

  Kaaba:any = {
    lat:21.422501,
    lng:39.826185
  };

  lat:number=21.54238;
  lng:number=39.19797;

  markers:any[]=[];

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.getalltents();
  }

  polyclick(){
    console.log('Polygon Clicked');
  }

  register(){
    const obj = {
      name:this.name,
      address:this.address,
      phone:this.phone,
      latitude:this.latitude,
      longitude:this.longitude,
      email:this.email,
      password:this.password,
      createdby:this.authService.getSavedEmail()
    };

    this.authService.registerfood(obj).subscribe(data=>{
      if(data.success){
        console.log(data.transport);
        this.getalltents();
      }else{
        alert('Try with other name for this tent. Already Present');
      }
    });
  }

  transportArr:any[]=[];
  isDataLoaded:boolean=false;
  getalltents(){
    this.isDataLoaded = false;
    this.authService.getallfood(this.authService.getSavedEmail()).subscribe(data=>{
      if(data.success){
        this.transportArr = data.data;
        this.markers = [];

        this.transportArr.forEach(element => {
          this.markers.push({
            lat:Number(element.latitude),
            lng:Number(element.longitude),
            name:element.name,
            phone:element.phone
          });
        });

        console.log(this.markers);
        this.isDataLoaded = true;
      }
    });
  }


}

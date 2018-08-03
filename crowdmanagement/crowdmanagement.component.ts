import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import {SebmGoogleMap,SebmGoogleMapPolygon,LatLngLiteral} from 'angular2-google-maps/core';
import { setInterval } from 'timers';
import { timeout } from '../../../../node_modules/@types/q';

@Component({
  selector: 'app-crowdmanagement',
  templateUrl: './crowdmanagement.component.html',
  styleUrls: ['./crowdmanagement.component.css']
})
export class CrowdmanagementComponent implements OnInit {

  stop=0;scenter=0;sbottom=0;
  stopleft=0;scenterleft=0;sbottomleft=0;
  stopright=0;scenterright=0;sbottomright=0;

  density=0;influx=0;outflux=0;speed=0;
  
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

  vid:String;
  occupancy:String;
  date:String;
  time:String;
  
  options:any;

  spinner=true;

  showmarker=false;
  // occupant 1 in center 21.422960, 39.827732
  // occupant 2 in center 21.423180, 39.827175
  // in top 21.423694, 39.827642

  markers:any[]=[];
  othermarkers:any[]=[];

  ngOnInit() {

    this.showmarker = true;
    this.spinner = false;
    // 21.422820, 39.827539
    // this.markers.push({lat:21.422960,lng:39.827732,name:'center1'});
    // this.markers.push({lat:21.423180,lng:39.827175,name:'center2'});
    // this.markers.push({lat:21.423694,lng:39.827642,name:'top'});
    //this.getalltents();



    // setInterval(()=>{
    //   this.generateRandomLatLngs(21.422820,39.827539);
    //   this.spinner = false;
    // },5000);

    
    
  }
  

  constructor(private authService:AuthService) { }


  listoflatlngs:any[]=[];

  topleftll:any[]=[]
  topll:any[]=[]
  toprightll:any[]=[]

  centerleftll:any[]=[]
  centerll:any[]=[]
  centerrightll:any[]=[]

  bottomleftll:any[]=[]
  bottomll:any[]=[]
  bottomrightll:any[]=[]

  generateRandomLatLngs(lat,lng){
    this.polylineArr=[];
    console.log('In random latlngs');
    
    this.markers = [];
    for (let index = 0; index < 65; index++) {
      
      var r = 50/111300 // = 500 meters
      , y0 = lat
      , x0 = lng
      , u = Math.random()
      , v = Math.random()
      , w = r * Math.sqrt(u)
      , t = 2 * Math.PI * v
      , x = w * Math.cos(t)
      , y1 = w * Math.sin(t)
      , x1 = x / Math.cos(y0)
  
      var newY = y0 + y1;
      var newX = x0 + x1;

      
      this.markers.push({
        lat:newY,
        lng:newX,
        name:newY+','+newX,
        icon:'http://tancro.e-central.tv/grandmaster/markers/google-icons/mapfiles-ms-micons/red.png'
      });
      
    }




    //this.verifypoints();
    //this.showmarker=true;
  
  }

  polylineArr:any[]=[]
  generatelatlngs(lat,lng,amount,data,location){
      
    console.log(data);
    
    this.othermarkers = [];
    //this.markers
    for (let index = 0; index < amount; index++) {
      
      var r = 25/111300 // = 500 meters
      , y0 = lat
      , x0 = lng
      , u = Math.random()
      , v = Math.random()
      , w = r * Math.sqrt(u)
      , t = 2 * Math.PI * v
      , x = w * Math.cos(t)
      , y1 = w * Math.sin(t)
      , x1 = x / Math.cos(y0)
  
      var newY = y0 + y1;
      var newX = x0 + x1;

      this.polylineArr.push({
        oldlat:data[index].lat,
        oldLng:data[index].lng,
        newLat:newY,
        newLng:newX
      });


      this.markers.push({
        lat:newY,
        lng:newX,
        name:'redirected from '+location,
        icon:'http://tancro.e-central.tv/grandmaster/markers/google-icons/mapfiles-ms-micons/blue.png'
      });


      
    }


    this.verifypoints();
    console.log('Polyline',this.polylineArr);

    // get additionalinfo
    var totaldistance = 0;
    this.polylineArr.forEach(element => {
      totaldistance+=this.calculateDistance(element.newLat,element.oldlat,element.newLng,element.oldLng);
    });
    this.density = this.scenterleft/totaldistance;
    this.density = Number(this.density.toFixed(2));
    this.outflux = this.scenterleft;
    this.speed = this.scenterleft*1.25/this.scenterleft;
    
  }

  load(){
    this.stopleft=0;this.stop=0;this.stopright=0;
    this.scenterleft=0;this.scenter=0;this.scenterright=0;
    this.sbottomleft=0;this.sbottom=0;this.sbottomright=0;
    this.density=0;this.influx=0;this.outflux=0;this.speed=0;
    this.generateRandomLatLngs(21.422820,39.827539);

    let classifyPoint = require("robust-point-in-polygon");
    //-1 inside 0 on boundry 1 outside

    //let polygonarr = [];
    

    let _center = [];
    let _centerleft = [];
    let _centerright = [];
    let _top = [];
    let _topleft = [];
    let _topright = [];
    let _bottom = [];
    let _bottomleft = [];
    let _bottomright = [];

    // center polygon
    this.centers.forEach(element => {
      let polypoint = [];
      polypoint.push(element.lat,element.lng);
      _center.push(polypoint);
    });

    // center left
    this.centerleft.forEach(element => {
      let polypoint = [];
      polypoint.push(element.lat,element.lng);
      _centerleft.push(polypoint);
    });

    // centerright
    this.centerright.forEach(element => {
      let polypoint = [];
      polypoint.push(element.lat,element.lng);
      _centerright.push(polypoint);
    });

    this.tops.forEach(element => {
      let polypoint = [];
      polypoint.push(element.lat,element.lng);
      _top.push(polypoint);
    });

    this.topsleft.forEach(element => {
      let polypoint = [];
      polypoint.push(element.lat,element.lng);
      _topleft.push(polypoint);
    });

    this.topright.forEach(element => {
      let polypoint = [];
      polypoint.push(element.lat,element.lng);
      _topright.push(polypoint);
    });

    this.bottom.forEach(element => {
      let polypoint = [];
      polypoint.push(element.lat,element.lng);
      _bottom.push(polypoint);
    });

    this.bottomleft.forEach(element => {
      let polypoint = [];
      polypoint.push(element.lat,element.lng);
      _bottomleft.push(polypoint);
    });

    this.bottomright.forEach(element => {
      let polypoint = [];
      polypoint.push(element.lat,element.lng);
      _bottomright.push(polypoint);
    });

    this.stopleft=0;this.stop=0;this.stopright=0;
    this.scenterleft=0;this.scenter=0;this.scenterright=0;
    this.sbottomleft=0;this.sbottom=0;this.sbottomright=0;

    this.topleftll = []; this.centerleftll=[]; this.bottomleftll=[];
    this.topll = []; this.centerll=[];this.bottomll=[];
    this.toprightll = []; this.centerrightll=[];this.bottomrightll=[];

    this.markers.forEach(element => {
      // TOP
      if (classifyPoint(_topleft,[element.lat,element.lng]) === -1 || classifyPoint(_topleft,[element.lat,element.lng]) === 0)
      {
        this.topleftll.push(element);
        this.stopleft++;
      }
      if (classifyPoint(_top,[element.lat,element.lng]) === -1 || classifyPoint(_top,[element.lat,element.lng]) === 0)
      {
        this.topll.push(element);
        this.stop++;
      }
      if (classifyPoint(_topright,[element.lat,element.lng]) === -1 || classifyPoint(_topright,[element.lat,element.lng]) === 0)
      {
        this.toprightll.push(element);
        this.stopright++;
      }

      // CENTER
      if (classifyPoint(_centerleft,[element.lat,element.lng]) === -1 || classifyPoint(_centerleft,[element.lat,element.lng]) === 0)
      {
        this.centerleftll.push(element);
        this.scenterleft++;
      }
      if (classifyPoint(_center,[element.lat,element.lng]) === -1 || classifyPoint(_center,[element.lat,element.lng]) === 0)
      {
        this.centerll.push(element);
        this.scenter++;
      }
      if (classifyPoint(_centerright,[element.lat,element.lng]) === -1 || classifyPoint(_centerright,[element.lat,element.lng]) === 0)
      {
        this.centerrightll.push(element);
        this.scenterright++;
      }

      if (classifyPoint(_bottomleft,[element.lat,element.lng]) === -1 || classifyPoint(_bottomleft,[element.lat,element.lng]) === 0)
      {
        this.bottomleftll.push(element);
        this.sbottomleft++;
      }
      if (classifyPoint(_bottom,[element.lat,element.lng]) === -1 || classifyPoint(_bottom,[element.lat,element.lng]) === 0)
      {
        this.bottomll.push(element);
        this.sbottom++;
      }
      if (classifyPoint(_bottomright,[element.lat,element.lng]) === -1 || classifyPoint(_bottomright,[element.lat,element.lng]) === 0)
      {
        this.bottomrightll.push(element);
        this.sbottomright++;
      }
    });

  }

  dispers(){
    this.verifypoints();
  }


  verifypoints(){
    let classifyPoint = require("robust-point-in-polygon");
    //-1 inside 0 on boundry 1 outside

    //let polygonarr = [];
    

    let _center = [];
    let _centerleft = [];
    let _centerright = [];
    let _top = [];
    let _topleft = [];
    let _topright = [];
    let _bottom = [];
    let _bottomleft = [];
    let _bottomright = [];

    // center polygon
    this.centers.forEach(element => {
      let polypoint = [];
      polypoint.push(element.lat,element.lng);
      _center.push(polypoint);
    });

    // center left
    this.centerleft.forEach(element => {
      let polypoint = [];
      polypoint.push(element.lat,element.lng);
      _centerleft.push(polypoint);
    });

    // centerright
    this.centerright.forEach(element => {
      let polypoint = [];
      polypoint.push(element.lat,element.lng);
      _centerright.push(polypoint);
    });

    this.tops.forEach(element => {
      let polypoint = [];
      polypoint.push(element.lat,element.lng);
      _top.push(polypoint);
    });

    this.topsleft.forEach(element => {
      let polypoint = [];
      polypoint.push(element.lat,element.lng);
      _topleft.push(polypoint);
    });

    this.topright.forEach(element => {
      let polypoint = [];
      polypoint.push(element.lat,element.lng);
      _topright.push(polypoint);
    });

    this.bottom.forEach(element => {
      let polypoint = [];
      polypoint.push(element.lat,element.lng);
      _bottom.push(polypoint);
    });

    this.bottomleft.forEach(element => {
      let polypoint = [];
      polypoint.push(element.lat,element.lng);
      _bottomleft.push(polypoint);
    });

    this.bottomright.forEach(element => {
      let polypoint = [];
      polypoint.push(element.lat,element.lng);
      _bottomright.push(polypoint);
    });

    this.stopleft=0;this.stop=0;this.stopright=0;
    this.scenterleft=0;this.scenter=0;this.scenterright=0;
    this.sbottomleft=0;this.sbottom=0;this.sbottomright=0;

    this.topleftll = []; this.centerleftll=[]; this.bottomleftll=[];
    this.topll = []; this.centerll=[];this.bottomll=[];
    this.toprightll = []; this.centerrightll=[];this.bottomrightll=[];

    this.markers.forEach(element => {
      // TOP
      if (classifyPoint(_topleft,[element.lat,element.lng]) === -1 || classifyPoint(_topleft,[element.lat,element.lng]) === 0)
      {
        this.topleftll.push(element);
        this.stopleft++;
      }
      if (classifyPoint(_top,[element.lat,element.lng]) === -1 || classifyPoint(_top,[element.lat,element.lng]) === 0)
      {
        this.topll.push(element);
        this.stop++;
      }
      if (classifyPoint(_topright,[element.lat,element.lng]) === -1 || classifyPoint(_topright,[element.lat,element.lng]) === 0)
      {
        this.toprightll.push(element);
        this.stopright++;
      }

      // CENTER
      if (classifyPoint(_centerleft,[element.lat,element.lng]) === -1 || classifyPoint(_centerleft,[element.lat,element.lng]) === 0)
      {
        this.centerleftll.push(element);
        this.scenterleft++;
      }
      if (classifyPoint(_center,[element.lat,element.lng]) === -1 || classifyPoint(_center,[element.lat,element.lng]) === 0)
      {
        this.centerll.push(element);
        this.scenter++;
      }
      if (classifyPoint(_centerright,[element.lat,element.lng]) === -1 || classifyPoint(_centerright,[element.lat,element.lng]) === 0)
      {
        this.centerrightll.push(element);
        this.scenterright++;
      }

      if (classifyPoint(_bottomleft,[element.lat,element.lng]) === -1 || classifyPoint(_bottomleft,[element.lat,element.lng]) === 0)
      {
        this.bottomleftll.push(element);
        this.sbottomleft++;
      }
      if (classifyPoint(_bottom,[element.lat,element.lng]) === -1 || classifyPoint(_bottom,[element.lat,element.lng]) === 0)
      {
        this.bottomll.push(element);
        this.sbottom++;
      }
      if (classifyPoint(_bottomright,[element.lat,element.lng]) === -1 || classifyPoint(_bottomright,[element.lat,element.lng]) === 0)
      {
        this.bottomrightll.push(element);
        this.sbottomright++;
      }
    });

    if(this.scenter >= 4){
      var dump = [];

      // contains actual people
      this.centerll.forEach(element => {

        var newarr = [];
        // console.log(
        //   this.calculateDistance(this.centers[0].lat,element.lat,this.centers[0].lng,element.lng).toFixed(3),
        //   this.calculateDistance(this.centers[1].lat,element.lat,this.centers[1].lng,element.lng).toFixed(3),
        //   this.calculateDistance(this.centers[2].lat,element.lat,this.centers[2].lng,element.lng).toFixed(3),
        //   this.calculateDistance(this.centers[3].lat,element.lat,this.centers[3].lng,element.lng).toFixed(3)
        // );

        newarr.push(parseFloat(this.calculateDistance(this.centers[0].lat,element.lat,this.centers[0].lng,element.lng).toFixed(3)));
        newarr.push(parseFloat(this.calculateDistance(this.centers[1].lat,element.lat,this.centers[1].lng,element.lng).toFixed(3)));
        newarr.push(parseFloat(this.calculateDistance(this.centers[2].lat,element.lat,this.centers[2].lng,element.lng).toFixed(3)));
        newarr.push(parseFloat(this.calculateDistance(this.centers[3].lat,element.lat,this.centers[3].lng,element.lng).toFixed(3)));
        
        // get min value
        //console.log('Min',Math.min.apply(Math,newarr),' index ',newarr.indexOf(Math.min.apply(Math,newarr)));
        
        
        // var value = temp.min;
        // var key = temp.indexOf(value);

        dump.push({
          lat:element.lat,
          lng:element.lng,
          name:element.name,
          distances:newarr,
          smallest:Math.min.apply(Math,newarr),
          nearerto:newarr.indexOf(Math.min.apply(Math,newarr))
        });
      });

      console.log(dump);
      // check how many nearer to how many points
      var tl=[]; var tr=[]; var br=[]; var bl=[];
      dump.forEach(element => {
        if(element.nearerto === 0){
          tl.push(element);
        }else if(element.nearerto === 1){
          tr.push(element);
        }else if(element.nearerto === 2){
          br.push(element);
        }else if(element.nearerto === 3){
          bl.push(element);
        }
      });

      
        
        var dtl = [];
        if(tl.length>0){
          dtl = tl;
          // check for the centerleft
          if(this.scenterleft<=10){
            console.log('center left is not full shifting the markers of center-topleft towards centerleft');
            
            // slowly replace values
            var beforesplicing = this.markers.length;
  
            this.othermarkers = [];
            dtl.forEach(element => {
  
              //console.log('element',''+element.lat,this.markers.findIndex(x => x.lat === element.lat));
  
              //console.log('markers',this.markers.length);
  
              
              this.markers.splice(this.markers.findIndex(x => x.lat === element.lat),1);
  
              //console.log('markers',this.markers.length);
              // //Earth’s radius, sphere
              // var R=6378137
  
              // //offsets in meters
              // var dn = 50
              // var de = 50
  
              // //Coordinate offsets in radians
              // var dLat = dn/R
              // var dLon = de/(R*Math.cos(Math.PI*parseFloat(element.lat)/180))
  
              // //OffsetPosition, decimal degrees
              // var latO = parseFloat(element.lat) + dLat * 180/Math.PI
              // var lonO = parseFloat(element.lng) + dLon * 180/Math.PI
  
              // console.log(element.lat,element.lng,latO,lonO)
  
              // this.othermarkers.push({lat:latO,lng:lonO,name:element.lat+','+element.lng});
  
            });
            var aftersplicing = this.markers.length;
            // middle of centerleft 21.422912, 39.826395
            this.generatelatlngs(21.422912,39.826395,dtl.length,dtl,'center');
          }
        }
        






      //console.log(tl,tr,br,bl);
      
      


    }



    //console.log(polygon);
    // occupant 1 in center 21.422960, 39.827732
    // occupant 2 in center 21.423180, 39.827175
    // in top 21.423694, 39.827642


  
    // console.log
    // (
    //   classifyPoint(polygon,[21.422960,39.827732]),
    //   classifyPoint(polygon,[21.423180,39.827175]),
    //   classifyPoint(polygon,[21.423694,39.827642]),
    // );
    

    //let polygon = [ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ] ];
 
    // console.log(
    //   classifyPoint(polygon, [1.5, 1.5]),
    //   classifyPoint(polygon, [1, 2]),
    //   classifyPoint(polygon, [100000, 10000]))
  }
    
  calculateDistance(lat1:number,lat2:number,long1:number,long2:number){
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((long1- long2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    return dis;
  }




  register(){
    const obj = {
      vid:this.vid,
      occupancy:this.occupancy,
      date:this.date,
      time:this.time,
      createdby:this.authService.getSavedEmail()
    };

    this.authService.registertransport(obj).subscribe(data=>{
      if(data.success){
        console.log(data.transport);
        this.getalltents();
      }else{
        alert('Try with other name for this tent. Already Present');
      }
    });
  }

  transportArr:any[]=[];
  getalltents(){
    this.authService.getalltransport(this.authService.getSavedEmail()).subscribe(data=>{
      if(data.success){
        this.transportArr = data.data;
        //console.log(this.transportArr);
      }
    });
  }

}

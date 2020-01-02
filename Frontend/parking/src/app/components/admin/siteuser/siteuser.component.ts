import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ParkingService } from '../shared/services/parking.service';
import { User } from 'src/app/shared/interfaces/interfaces';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-siteuser',
  templateUrl: './siteuser.component.html',
  styleUrls: ['./siteuser.component.css']
})
export class SiteuserComponent implements OnInit,OnDestroy {

  parkingUser$:Observable<User[]>
  private unSubscribe=new Subject();
  constructor(private parkingservice:ParkingService) { }

  ngOnInit() {
    this.parkingUser$=this.parkingservice.getUser()
  }
  deleteUser(id){
    this.parkingservice.deleteUser(id).pipe(takeUntil(this.unSubscribe)).subscribe(()=>{MaterialService.toast("Користувач видалений")})
  }
  ngOnDestroy(){
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

}

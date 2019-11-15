
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy, EventEmitter, Output, OnChanges } from '@angular/core';
import { MaterialService, MaterialDatepicker} from '../../../shared/classes/material.service'


@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent implements OnInit,AfterViewInit,OnDestroy {
  @ViewChild('picker1',{static:false}) from:ElementRef;
  @ViewChild('picker2',{static:true}) to:ElementRef;
  @Output() childSubmit=new EventEmitter()
  start:MaterialDatepicker;
  end:MaterialDatepicker;
  applicantForm:FormGroup;
  isValid=true;
  form={}

  costructor() { }

  ngOnInit() {
   this.applicantForm=new FormGroup({
     one:new FormControl('',Validators.required),
     two:new FormControl('',Validators.required),
     description:new FormControl('')
   })
  }
  ngAfterViewInit(){
    MaterialService.updateTextInput()
    this.start= MaterialService.initDatepicker(this.from ,this.validate.bind(this))
    this.end= MaterialService.initDatepicker(this.to,this.validate.bind(this))
  }
  validate(){
    if(this.start.date|| this.end.date){
        this.isValid=false;

    }
    else if (!this.start.date || !this.end.date ) {
      this.isValid=true;
    }

    this.isValid=this.start.date<this.end.date;

    }
    onSubmit(){
      this.childSubmit.emit(this.form={
        form:this.applicantForm.value,
        picker1:this.start.date,
        picker2:this.end.date
      })
          this.applicantForm.reset()
    }
    ngOnDestroy(){
      this.start.destroy()
      this.end.destroy();
    }


}


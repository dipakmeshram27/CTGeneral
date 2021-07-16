import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/service/toast/toast.service';
import { Vitals } from '../model/vitals';
import { VitalsService } from '../service/vitals.service';

@Component({
  selector: 'app-vital-signs',
  templateUrl: './vital-signs.component.html',
  styleUrls: ['./vital-signs.component.css']
})
export class VitalSignsComponent implements OnInit {

  Form: FormGroup;
  submitted = false;  

  constructor(private formBuilder:FormBuilder,
              private service: VitalsService,
               private toastService: ToastService) { }

  ngOnInit(): void {

    this.Form=this.formBuilder.group({
      height: ['',Validators.required],
      weight: ['',Validators.required],
      bloodPressure: ['',Validators.required],
      bodyTemperature: ['',Validators.required],
      respirationRate: ['',Validators.required]
    });
  }

  onSubmit(){
    this.submitted=true;
    if(this.Form.invalid){
      return;
    }
    let vital: Vitals= this.Form.value;
    vital.appointmentId=1;
    this.service.addVitals(vital).subscribe(data=>{
      this.toastService.show(data.statusMessage,{ classname: 'bg-success text-light', delay: 5000 })
    })
  }

}

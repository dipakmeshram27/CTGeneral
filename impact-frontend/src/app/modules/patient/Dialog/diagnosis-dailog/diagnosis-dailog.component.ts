import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup ,FormControl, FormBuilder, Validators} from '@angular/forms';
import { DiagnosisService } from '../../service/diagnosis.service';
import { debounceTime } from 'rxjs/operators';
import { Diagnosis } from '../../model/diagnosis';
@Component({
  selector: 'app-diagnosis-dailog',
  templateUrl: './diagnosis-dailog.component.html',
  styleUrls: ['./diagnosis-dailog.component.css']
})
export class DiagnosisDailogComponent implements OnInit {

  title :string="Add Daignosis details";
  myControl: FormControl;
  Form: FormGroup;
  submitted = false; 
  options=[];
  filteroptions;
  filteroptions1;
  options1=[];

  constructor(private dialogRef: MatDialogRef<DiagnosisDailogComponent>,
              private formBuilder: FormBuilder,
              private service: DiagnosisService) { }

  ngOnInit() {

    this.Form=this.formBuilder.group({
      diagnosisCode: ['',Validators.required],
      diagnosisName: ['',Validators.required],
      description: ['']
    });

    this.Form.get('diagnosisName').valueChanges.
      pipe(debounceTime(1000)).subscribe(response => {
        if (response && response.length) {
          this.filterData(response);
        } else {
          this.filteroptions = [];
        }
      })

      this.Form.get('diagnosisCode').valueChanges.
      pipe(debounceTime(1000)).subscribe(response => {
        if (response && response.length) {
          this.filterCode(response);
        } else {
          this.filteroptions1 = [];
        }
      })
    
    this.getAllDiagnosisNames();
    this.getAllCodes();
  }

  
  filterData(enteredData) {
    this.filteroptions = this.options.filter(item => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }

  filterCode(enteredData){
    this.filteroptions1 = this.options1.filter(item => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }

  onSubmit(){
    this.submitted=true;
    this.service.addDiagnosis(this.Form.value);
    this.dialogRef.close();
    let diagnose:Diagnosis=this.Form.value;
    let appointmentId=2;
    this.service.saveDiagnosis(diagnose,appointmentId).subscribe(data=>{

    })
  }
  
  save(){}

  onNoClick(){
    this.dialogRef.close();
  }

  getAllDiagnosisNames(){
    this.service.getAllData().subscribe(data =>{
      this.options=data;
      this.filteroptions=data;
    })
  }

  getAllCodes(){
    this.service.getAllDiagnosisCode().subscribe(data =>{
      this.options1=data;
      this.filteroptions1=data;
    })
  }
}

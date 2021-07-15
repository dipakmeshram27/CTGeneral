import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProcedureService } from '../../service/procedure.service';
import { debounceTime } from 'rxjs/operators';
import { Procedure } from '../../model/procedure';
import { ToastService } from 'src/app/service/toast/toast.service';

@Component({
  selector: 'app-procedure-dailog',
  templateUrl: './procedure-dailog.component.html',
  styleUrls: ['./procedure-dailog.component.css']
})
export class ProcedureDailogComponent implements OnInit {

  public Form: FormGroup;
  procedureNames=[];
  procedurecodes=[];
  filteredOptions;
  filterdCodes;
  constructor(private dailogRef: MatDialogRef<ProcedureDailogComponent>,
              private formBuilder: FormBuilder,
               private procedureService: ProcedureService,
               private to: ToastService) { }

  ngOnInit(): void {

    this.Form=this.formBuilder.group({
      procedureCode: ['',Validators.required],
      procedureName: ['',Validators.required],
      discription: ['',Validators.required]
    })

    this.Form.get('procedureName').valueChanges.
      pipe(debounceTime(1000)).subscribe(response => {
        if (response && response.length) {
          this.filterData(response);
        } else {
          this.filteredOptions = [];
        }
      })

      this.Form.get('procedureCode').valueChanges.
      pipe(debounceTime(1000)).subscribe(response => {
        if (response && response.length) {
          this.filterProcedureCodes(response);
        } else {
          this.filterdCodes = [];
        }
      })

    this.getAllProcedureNames();
    this.getAllProcedureCodes();
  }

  filterData(enteredData) {
    this.filteredOptions = this.procedureNames.filter(item => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }

  filterProcedureCodes(enteredData){
    this.filterdCodes = this.procedurecodes.filter(item => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }

  onNoClick(){
    this.dailogRef.close();
  }

  onSubmit(){
      this.procedureService.addProcedures(this.Form.value);
      this.dailogRef.close();
      let procedure:Procedure=this.Form.value;
      let appointmeId=4;
      this.procedureService.saveProcedures(procedure,appointmeId).subscribe(data=>{
        this.to.show(data.statusMessage,{ classname: 'bg-success text-light', delay: 5000 })
      });
      
  }

  getAllProcedureNames(){
    this.procedureService.getAllData().subscribe(data =>{
      this.filteredOptions=data;
      this.procedureNames=data;
    })
  }

  getAllProcedureCodes(){
    this.procedureService.getAllCodes().subscribe(data=>{
       this.filterdCodes=data;
       this.procedurecodes=data;
    })
  }

}

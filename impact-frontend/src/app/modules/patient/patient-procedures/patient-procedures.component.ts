import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { ToastService } from 'src/app/service/toast/toast.service';
import { ProcedureDailogComponent } from '../Dialog/procedure-dailog/procedure-dailog.component';
import { Procedure } from '../model/procedure';
import { ProcedureService } from '../service/procedure.service';

@Component({
  selector: 'app-patient-procedures',
  templateUrl: './patient-procedures.component.html',
  styleUrls: ['./patient-procedures.component.css']
})
export class PatientProceduresComponent implements OnInit {

  isPopupOpened = true;

  constructor(private dailog?: MatDialog,
              private service?:ProcedureService,
              private to?:ToastService) { }

  ngOnInit(): void {
  }

  addProcedure(){

    const dialogConfig = new MatDialogConfig();
  
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
       dialogConfig.width="400px";
       dialogConfig.height="380px";
      dialogConfig.position = {
       
    };

    this.isPopupOpened=true;
    const dialogRef=this.dailog.open(ProcedureDailogComponent,dialogConfig);
  }

  get ProcedureList(){
    return this.service.getAllProcedures();
  }

  deleteProcedure(id: number){
     this.service.deleteProcedure(id);
     this.to.show("one row deleted",{ classname: 'bg-danger text-light', delay: 1000 })
  }

  save(){
    
  }

}

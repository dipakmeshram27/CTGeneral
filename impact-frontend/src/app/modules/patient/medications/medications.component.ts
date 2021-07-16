import { Component, OnInit } from '@angular/core';
import { MatDialog ,MatDialogConfig} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastService } from 'src/app/service/toast/toast.service';
import { MedicationsDialogComponent } from '../Dialog/medications-dialog/medications-dialog.component';
import { MedicationsService } from '../service/medications.service';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.css']
})
export class MedicationsComponent implements OnInit {

  isPopupOpened = true;
 

 listdata: MatTableDataSource<any>;
  constructor(private  dialog?: MatDialog,
        private medService?: MedicationsService,
        private toastService?:ToastService) { }

  ngOnInit() {
   

  }

  get MedicationList(){
    return this.medService.getAllMedList();
  }

  addMedication(){

    const dialogConfig = new MatDialogConfig();
  
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
       dialogConfig.width="400px";
       dialogConfig.height="380px";
      dialogConfig.position = {
       
    };

    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(MedicationsDialogComponent,dialogConfig);


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }

  deleteMedication(drugId:number){
    this.medService.deleteMedication(drugId);
    this.toastService.show("one row deleted",{ classname: 'bg-danger text-light', delay: 1000 })
  }

  editMedication(drugId:number){
    this.isPopupOpened=true;
    const medicine = this.medService.getAllMedList().find(m => m.drugId === drugId);
    const dialogRef =this.dialog.open(MedicationsDialogComponent,{
      data:medicine
    });
  }

  save(){
    console.log(this.MedicationList)
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
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
        private medService?: MedicationsService) { }

  ngOnInit() {
   

  }

  get MedicationList(){
    return this.medService.getAllMedList();
  }

  addMedication(){

    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(MedicationsDialogComponent, {
      data: {}
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }

  deleteMedication(drugId:number){
    this.medService.deleteMedication(drugId);
  }

  editMedication(drugId:number){
    this.isPopupOpened=true;
    const medicine = this.medService.getAllMedList().find(m => m.drugId === drugId);
    const dialogRef =this.dialog.open(MedicationsDialogComponent,{
      data:medicine
    });
  }

}

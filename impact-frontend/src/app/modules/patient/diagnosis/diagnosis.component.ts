import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { ToastService } from 'src/app/service/toast/toast.service';
import { DiagnosisDailogComponent } from '../Dialog/diagnosis-dailog/diagnosis-dailog.component';
import { DiagnosisService } from '../service/diagnosis.service';


// export interface UsersData {
//   name: string;
//   id: number;
//   position: number;
// }

// const ELEMENT_DATA: UsersData[] = [
//   {position:1,id: 156, name: 'diagnose 1'},
//   {position:2,id: 156, name: 'diagnose 2'},
//   {position:3,id: 157, name: 'diagnose 3'},
//   {position:4 ,id: 158, name: 'diagnose 4'}
// ];


@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})




export class DiagnosisComponent implements OnInit {

  
  isPopupOpened = true;
  
  constructor(private dialog?: MatDialog,
              private service?: DiagnosisService,
              private to?:ToastService) { }

  ngOnInit(): void {
  }

  addDiagnosis(){
    // this.isPopupOpened = true;
    // const dialogRef = this.dialog.open(DiagnosisComponent, {
    //   data: {}
    // });


    // dialogRef.afterClosed().subscribe(result => {
    //   this.isPopupOpened = false;
    // });
    //this.dialog.open(DiagnosisDailogComponent);
    
      const dialogConfig = new MatDialogConfig();
  
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
       dialogConfig.width="400px";
       dialogConfig.height="350px";
      dialogConfig.position = {
       
    };
     
      //this.dialog.open(DiagnosisDailogComponent, dialogConfig);
      
      const dialogRef = this.dialog.open(DiagnosisDailogComponent, dialogConfig);
  
      dialogRef.afterClosed().subscribe(
          data => console.log("Dialog output:", data)
      );    
  
  }

  get DiagnosisList(){
    return this.service.getAllList();
  }

  deleteDiagnosis(id: number){
    console.log(id)
    this.service.deleteDiagnosis(id);
    this.to.show("one row deleted",{ classname: 'bg-danger text-light', delay: 1000 })

  }

}

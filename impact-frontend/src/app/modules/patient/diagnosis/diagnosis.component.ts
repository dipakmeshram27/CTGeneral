import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { DiagnosisDailogComponent } from '../Dialog/diagnosis-dailog/diagnosis-dailog.component';


export interface UsersData {
  name: string;
  id: number;
  position: number;
}

const ELEMENT_DATA: UsersData[] = [
  {position:1,id: 156, name: 'diagnose 1'},
  {position:2,id: 156, name: 'diagnose 2'},
  {position:3,id: 157, name: 'diagnose 3'},
  {position:4 ,id: 158, name: 'diagnose 4'}
];


@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})




export class DiagnosisComponent implements OnInit {

  displayedColumns: string[] = ['position','id', 'name','action'];
  dataSource = ELEMENT_DATA;
  isPopupOpened = true;
  
  constructor(private dialog?: MatDialog) { }

  ngOnInit(): void {
  }

  addContact(){
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
       dialogConfig.width="500px";
      dialogConfig.position = {
       
    };
     
      //this.dialog.open(DiagnosisDailogComponent, dialogConfig);
      
      const dialogRef = this.dialog.open(DiagnosisDailogComponent, dialogConfig);
  
      dialogRef.afterClosed().subscribe(
          data => console.log("Dialog output:", data)
      );    
  
  }

}

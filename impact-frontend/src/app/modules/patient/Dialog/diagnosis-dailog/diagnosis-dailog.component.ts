import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup ,FormControl} from '@angular/forms';

@Component({
  selector: 'app-diagnosis-dailog',
  templateUrl: './diagnosis-dailog.component.html',
  styleUrls: ['./diagnosis-dailog.component.css']
})
export class DiagnosisDailogComponent implements OnInit {

  title :string="Add Daignosis details";
  myControl: FormControl;
  form: FormGroup;
  options:string[]=['156','157','158'];

  constructor(private dialogRef: MatDialogRef<DiagnosisDailogComponent>) { }

  ngOnInit():any {
    return this.options;
  }

  
  save(){}

  close(){
    this.dialogRef.close();
  }


}

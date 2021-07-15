import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MedicationsService } from '../../service/medications.service';
import { Medications } from '../../model/medications';
import { ToastService } from 'src/app/service/toast/toast.service';


@Component({
  selector: 'app-medications-dialog',
  templateUrl: './medications-dialog.component.html',
  styleUrls: ['./medications-dialog.component.css']
})
export class MedicationsDialogComponent implements OnInit {

  public Form: FormGroup;
  options = ["sam", "jon"];
  option1=["form","form2"];
  users: {};
  filteredOptions;
  filteredOptions1;

  listoption;
  listForms;

  constructor(private dialogRef: MatDialogRef<MedicationsDialogComponent>,
    private formBuilder: FormBuilder,
    private medService: MedicationsService,
    private to: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnChanges() {

  }

  ngOnInit() {
    this.initForm();
    this.getDrugId();
    this.getAllusers();
    this.getDrugForm();
  }

  initForm(){
    this.Form = this.formBuilder.group({
      // DrugID: ['', Validators.required],
      drugName: ['', Validators.required],
      drugForm: ['', Validators.required],
      discription:['']
    });

    this.Form.get('drugName').valueChanges.
      pipe(debounceTime(1000)).subscribe(response => {
        if (response && response.length) {
          this.filterData(response);
        } else {
          this.filteredOptions = [];
        }
      })

      this.Form.get('drugForm').valueChanges.
      pipe(debounceTime(1000)).subscribe(response => {
        if (response && response.length) {
          this.filterData1(response);
        } else {
          this.filteredOptions1 = [];
        }
      })

  }

  filterData1(enteredData){
    this.filteredOptions1 = this.option1.filter(item => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }

  filterData(enteredData) {
    this.filteredOptions = this.options.filter(item => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {

    this.medService.addMedication(this.Form.value);
    this.dialogRef.close();
    let medicine:Medications=this.Form.value;
    medicine.appointmentId=2;
    console.log(medicine)
    this.medService.saveMedication(medicine).subscribe(data=>{
      this.to.show(data.statusMessage,{ classname: 'bg-success text-light', delay: 5000 })
    })
  }

  getDrugId() {
    this.medService.getData().subscribe(responce => {
      console.log(responce)
      this.listoption = responce;
    })
  }

  getDrugForm(){
    this.medService.getAllDrugForm().subscribe(res =>{
      this.option1=res;
      this.filteredOptions1=res;
      
    })
  }

  getPosts(value) {
    console.log(value);
    this.medService.getDrugByID(value).subscribe(res =>{
      console.log(res);
      
    })

  }

  getAllusers() {
    this.medService.getallDAta().subscribe(res => {

      this.options = res;
      this.filteredOptions = res;
    })
  }


}

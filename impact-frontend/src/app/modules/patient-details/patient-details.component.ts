import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY } from 'rxjs';
import { patientdetails } from 'src/app/model/patientdetails';
import { PatientdetailsService } from 'src/app/service/patient/patientdetails-service';
import { ToastService } from 'src/app/service/toast/toast.service';
import { tap, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,

} from "ngx-intl-tel-input";
import { LoginService } from 'src/app/service/login/login-service';
import { getAge } from 'src/app/utils/utils';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  phone: PhoneNumberFormat = PhoneNumberFormat.International;
  address: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
  emgr_address: string;
  emgr_city: string;
  emgr_pincode: string;
  emgr_state: string;
  emgr_country: string;


  phnumberformat:  PhoneNumberFormat[]= [

    PhoneNumberFormat.International
  ];

  ph_number;
  patient_age: number;
  dob= new Date();


  public age;
  public showage;

  public phonenumber;

  reactiveForm: FormGroup;
  first: boolean = false;
  other: boolean = true;
  options: boolean;
  submitted: boolean = false;
  allergy_idlist;
  allergy_namelist;
  allergy_typelist;

  separateDialCode = false;
  SearchCountryField = SearchCountryField;

  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom
  ];
allergy =[];



  get f() { return this.reactiveForm.controls; }
  constructor(private formBuilder: FormBuilder, private patiendetailService: PatientdetailsService, private toastService: ToastService, private loginService: LoginService) {


  }


  ngOnInit(): void {

    this.reactiveForm = this.formBuilder.group({
      allergy_id: [' '],
      allergy_name: [' '],
      allergy_type: ['']
    });

    this.patiendetailService.getAllergy().subscribe(allergy_idlist => {
      this.allergy_idlist = allergy_idlist;
    });
    /* this.patiendetailService.getAllergy().subscribe(allergy_namelist => {
      this.allergy_namelist = allergy_namelist;
    });
    this.patiendetailService.getAllergy().subscribe(allergy_typelist => {
      this.allergy_typelist = allergy_typelist;
    }); */

    // this.reactiveForm = this.formBuilder.group({
    //   title: ['']
    // });






    this.reactiveForm = this.formBuilder.group({
      title: new FormControl(),
      first_name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      last_name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      dob: new FormControl(),
      patient_age: new FormControl(),
      gender: new FormControl(),
      race: new FormControl('', [Validators.minLength(2), Validators.maxLength(50)]),
      ethinicity: new FormControl('', [Validators.minLength(2), Validators.maxLength(50)]),
      lang_known: new FormControl('', [Validators.minLength(2), Validators.maxLength(50)]),
      email: new FormControl('', [Validators.minLength(15)]),
      ph_number: new FormControl('', [Validators.minLength(7)]),
      address: new FormControl(),
      city: new FormControl(),
      pincode: new FormControl(),
      state: new FormControl(),
      country: new FormControl(),
      emgr_title: new FormControl(),
      emgr_fname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      emgr_lname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      emgr_email: new FormControl('', [Validators.minLength(15)]),
      emgr_phnumber: new FormControl(),
      emgr_relation: new FormControl(),
      emgr_address: new FormControl(),
      emgr_city: new FormControl(),
      emgr_pincode: new FormControl(),
      emgr_state: new FormControl(),
      emgr_country: new FormControl(),
      allergy_option: new FormControl(),
      allergy_id: new FormControl(),
      allergy_name: new FormControl(),
      allergy_type: new FormControl(),
      other_allergy: new FormControl(),
      allergy_fatal: new FormControl(),
      allergy_desc: new FormControl('', [Validators.required])

    });

    this.reactiveForm.get('dob').valueChanges.subscribe(value => {
      this.ageCalculator();
    })

  }

  onSubmit() {

    console.log('inside submit')
    this.submitted = true;
   
    console.log(PhoneNumberFormat.International.valueOf.toString);
    
    console.log('inside outside submit')
    console.log(this.reactiveForm.value);
    let _patientDetails: patientdetails = this.reactiveForm.value;
    // newUser.role = 1;
    this.patiendetailService.patientdetails(_patientDetails).subscribe(data => {
      this.toastService.show(data.statusMessage, { classname: 'bg-success text-light', delay: 5000 })
    },
      error => {
        this.toastService.show('Server Error please try later', { classname: 'bg-danger text-light', delay: 5000 });
      })
  }

  onChangeAllergyName() {
    this.reactiveForm.get('allergy_name').setValue(this.allergy_idlist.filter(allergeies =>allergeies.id == this.reactiveForm.get('allergy_id').value)[0].allergy_name);
    this.reactiveForm.get('allergy_type').setValue(this.allergy_idlist.filter(allergeies =>allergeies.id == this.reactiveForm.get('allergy_id').value)[0].allergy_type);
  }



  private selectedLink: string = "No";

  setradio(e: string): void {

    this.selectedLink = e;

  }

  isSelected(name: string): boolean {

    if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
      return false;
    }

    return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
  }

  addresscheck(event) {

   

    if (event.target.checked) {
      this.emgr_address = this.address;
      this.emgr_city = this.city;
      this.emgr_pincode = this.pincode;
      this.emgr_state = this.state;
      this.emgr_country = this.country;
    }
    else {
      this.emgr_address = '';
      this.emgr_city = '';
      this.emgr_pincode = '';
      this.emgr_state = '';
      this.emgr_country = '';
    }


  }
  
  ageCalculator(){
    let date1 = this.reactiveForm.get('dob').value;
    let date2 = new Date();
    //getAge(date1,date2);
    console.log(getAge(date1,date2));
    this.reactiveForm.get('patient_age').setValue(getAge(date1,date2));
  }

  phonecode(){
    console.log('inside ph');
    this.ph_number=this.phone;
    console.log( this.ph_number);
  }

  
      exportCSV() {
        console.log('export csv called'); 
        this.patiendetailService.getCSVReport(parseInt(localStorage.getItem("id")));
      }

   
}

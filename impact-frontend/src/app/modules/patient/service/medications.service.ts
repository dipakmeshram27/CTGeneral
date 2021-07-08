import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medications } from '../model/medications';
import {map, skipWhile, tap} from 'rxjs/operators'

const baseUrl= "http://localhost:8081/drug/drugs";

@Injectable({
  providedIn: 'root'
})
export class MedicationsService {

  _medicationList: Medications[]=[];

  constructor(private http: HttpClient) { }

  addMedication(medication: Medications){
    this._medicationList.push(medication);
  }

  getAllMedList(){
    return this._medicationList;
    
  }

  deleteMedication(drugId:number){
    const medicine = this._medicationList.findIndex(m => m.drugId === drugId);
    this._medicationList.splice(medicine,1);
  }

  getData(){
    return this.http.get(baseUrl)
      .pipe(
        map((response:[]) => response.map(item => item['drugId']))
      )
  }

  getallDAta(){
    return this.http.get(baseUrl)
      .pipe(
        map((response:[]) => response.map(item => item['drugName']))
      )
  }

  getAllDrugForm(){
    return this.http.get(baseUrl)
      .pipe(
        map((response:[]) => response.map(item => item['drugForm']))
      )
  }

  getDrugByID(id){
    return this.http.get(`${baseUrl}/${id}`)   
  }

}

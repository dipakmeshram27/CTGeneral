import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Diagnosis } from '../model/diagnosis';
import {map} from 'rxjs/operators';

const basrUrl="http://localhost:8081/diagnosis";

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {

  diagnosislist: Diagnosis[]=[];
  constructor(private http: HttpClient) { }

  addDiagnosis(diagnosis: Diagnosis){
     this.diagnosislist.push(diagnosis);
  }

  getAllList(){
    return this.diagnosislist;
  }

  deleteDiagnosis(diagnosisCode: number){
   const diagnose= this.diagnosislist.findIndex(d => d.diagnosisCode === diagnosisCode);
   this.diagnosislist.splice(diagnose,1);
  }

   getAllData(){
    return this.http.get(`${basrUrl}/diagnosiss`)
      .pipe(
        map((response:[]) => response.map(item => item['diagnosisName']))
      )
  }

  getAllDiagnosisCode(){
    return this.http.get(`${basrUrl}/diagnosiss`)
      .pipe(
        map((response:[]) => response.map(item => item['diagnosisCode']))
      )
  }

  saveDiagnosis(diagnosis: Diagnosis,id :number){
    return this.http.post(`${basrUrl}/saveDaignosis/${id}`,diagnosis);
  }

}

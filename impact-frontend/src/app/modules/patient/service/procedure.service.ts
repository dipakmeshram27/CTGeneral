import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Procedure } from '../model/procedure';
import {map, skipWhile, tap} from 'rxjs/operators';
import { Observable } from 'rxjs';

const baseUrl="http://localhost:8081/procedure";

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {

  procedureList: Procedure[]=[];

  constructor(private http: HttpClient) { }

  addProcedures(procedure: Procedure){
    this.procedureList.push(procedure);
  }

  getAllProcedures(){
    return this.procedureList;
  }

  deleteProcedure(procedureCode:number){
     const procedure=this.procedureList.findIndex(p =>p.procedureCode === procedureCode);
     this.procedureList.splice(procedure,1);
  }

  getAllData(){
    return this.http.get(`${baseUrl}/procedures`)
      .pipe(
        map((response:[]) => response.map(item => item['procedureDiscription']))
      )
  }

  getAllCodes(){
    return this.http.get(`${baseUrl}/procedures`)
      .pipe(
        map((response:[]) => response.map(item => item['procedureCode']))
      )
  }
  
  saveProcedures(procedure:Procedure,id: number):Observable<any>{
    return this.http.post(`${baseUrl}/saveProcedures/${id}`,procedure);
  }

}

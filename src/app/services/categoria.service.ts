import { Categorias } from './../interfaces/categorias';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaServiceService {

  private apiUrl = 'http://localhost:3000/categorias'; //URL da API
  constructor(private http:HttpClient) { }

list():Observable<Categorias[]>{
  return this.http.get<Categorias[]>(this.apiUrl) as Observable<Categorias[]>
}
 //método adicionar uma categoria
 add(categoria:Categorias){
  const httpHeaders = {
    headers:{
      'Content-type': 'application/json'

    }
  }
  return this.http.post(this.apiUrl, categoria, httpHeaders);
}
}

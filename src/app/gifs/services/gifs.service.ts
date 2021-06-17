import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey:string = "c98ZVkNlzlYPyrKdprtkejHhgSR3pqox"
  private _historia: string[] = [];
  private servicioUrl:string = "http://api.giphy.com/v1/gifs";
  public resultado:Gif[] = [];
  
  get historial() {
    return [...this._historia];
  }

  constructor(private http: HttpClient) {
    this._historia = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultado = JSON.parse(localStorage.getItem('resultados')!) || [];
   }

  buscarGifs(query:string ){
    query = query.trim().toLocaleLowerCase();
    if (!this._historia.includes(query)) {
      this._historia.unshift(query);
      this._historia = this._historia.splice(0,10)
      localStorage.setItem('historial',JSON.stringify(this._historia))
    }

    console.log(this._historia);

    const params = new HttpParams()
                    .set('api_key',this.apiKey)
                    .set('limit',12)
                    .set('q',query)

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search?${params}`).subscribe( (resp) =>{
      // console.log(resp.data);
      localStorage.setItem('resultados',JSON.stringify(resp.data))
      this.resultado = resp.data
      
    })
  }
  
}

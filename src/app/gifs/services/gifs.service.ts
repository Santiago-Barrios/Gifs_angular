import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private ulrService: string = 'http://api.giphy.com/v1/gifs'
  private API_giphy: string = 'BVtQVNAlmAGrRltgYkXtVP8P4c9lZdN9';
  private _historial:string[] = [];
  public results: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor( private http: HttpClient ){ 
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.results = JSON.parse( localStorage.getItem('Gifs')!) || [];
    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
  }

  buscarGifts(query: string){

    const queryMinus = query.trim().toLowerCase();

    if(!this._historial.includes(queryMinus)){
      this._historial.unshift(queryMinus);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
            .set('api_key', this.API_giphy)
            .set('limit', '10')
            .set('q', query);
    
    this.http.get<SearchGifsResponse>(`${this.ulrService}/search`, { params })
    .subscribe( (resp) => {
          localStorage.setItem('Gifs', JSON.stringify(resp.data));
          this.results = resp.data;
        } )

  }

}

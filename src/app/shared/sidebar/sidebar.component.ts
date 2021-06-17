import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent{

  get historial() : string[] {
    return this.GifsService.historial
  }

  constructor(private GifsService:GifsService ) {}

  Buscar(termino:string){
    this.GifsService.buscarGifs(termino)
  }
}

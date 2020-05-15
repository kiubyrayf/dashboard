import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pollsters',
  templateUrl: './pollsters.component.html',
  styleUrls: ['./pollsters.component.scss']
})
export class PollstersComponent implements OnInit {
  public encuestadores = [];
  cargando = false;
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-nav-bar-business',
  templateUrl: './nav-bar-business.component.html',
  encapsulation: ViewEncapsulation.None
})
export class NavBarBusinessComponent implements OnInit {

  padre: string;

  constructor() { }

  ngOnInit() { }

}

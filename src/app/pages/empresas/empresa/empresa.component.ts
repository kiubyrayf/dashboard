import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  @Input() formData;
  constructor() { }
  ngOnInit(): void {
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html'
})
export class TestComponent implements OnInit {
    @Input() formData;
    title = 'Empresa';

    ngOnInit() {}

}

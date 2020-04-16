import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html'
})
export class Testcomponent implements OnInit { 

    message: string;

    ngOnInit() {
        this.message = "Message Works!";
    }
}

import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent {
    public readMeUrl = 'https://raw.githubusercontent.com/nellycheboi12/Store/master/README.md';
    content: string;
    constructor(private http: Http)  {
        
    }
    ngOnInit()  {
       this.getReadMeContent();
    }

    getReadMeContent() : void {
        this.http.get(this.readMeUrl).subscribe(result => {
            this.content = result.text();
        });
    }
}



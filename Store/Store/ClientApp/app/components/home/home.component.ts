import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent {
    public readMeUrl = 'https://raw.githubusercontent.com/nellycheboi12/Store/master/README.md';
    content: string;
    /**
     * Intialiazes a http variable.
     * @param http
     */
    constructor(private http: Http)  {
    }

    /**
     * Make a call to getReadMeContent() to retrive read me
     */
    ngOnInit()  {
       this.getReadMeContent();
    }
    /**
     * Makes a asynchronous http request to github to retrieve the ReadMe file
     */
    getReadMeContent() : void {
        this.http.get(this.readMeUrl).subscribe(result => {
            this.content = result.text();
        });
    }
}

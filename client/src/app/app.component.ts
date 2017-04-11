import { Component, OnInit, NgZone } from '@angular/core';
import { FormControl } from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import { } from '@types/googlemaps';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'app works!';

    public places = [];

    public searchControl: FormControl;

    private searchService: google.maps.places.PlacesService;

    constructor(private zone: NgZone) {
        let map = new google.maps.Map(document.getElementById('results'));
        this.searchService = new google.maps.places.PlacesService(map);
    }

    ngOnInit() {
        this.searchControl.valueChanges
            .debounceTime(500)
            .subscribe((value) => { 
                let request: google.maps.places.TextSearchRequest = {
                    query: value
                };

                this.searchService.textSearch(request, (res) => {
                    this.zone.run(() => {
                        this.places = res;
                    })
                });
            })
    }
}

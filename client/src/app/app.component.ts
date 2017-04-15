import { Component, OnInit, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import { FormControl } from "@angular/forms";
import 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
    private isAlive = true;

    title = 'app works!';

    public places : google.maps.places.PlaceResult[] = [];

    public searchControl = new FormControl();

    private searchService: google.maps.places.PlacesService;

    constructor(private zone: NgZone) { }

    ngAfterViewInit() { 
        let map = new google.maps.Map(document.getElementById('results'));
        this.searchService = new google.maps.places.PlacesService(map);
        this.searchControl.valueChanges
            .debounceTime(500)
            .takeWhile(() => this.isAlive)
            .distinctUntilChanged()
            .subscribe((value) => {
                this.zone.run(() => {
                    this.places = [];
                });

                if (!value) return;

                value = 'bar near ' + value;                

                let request: google.maps.places.TextSearchRequest = {
                    query: value
                };

                this.searchService.textSearch(request, (res) => {
                    this.zone.run(() => {
                        this.places = res;
                    });
                });
            });
    }

    ngOnDestroy() { 
        this.isAlive = false;
    }
}

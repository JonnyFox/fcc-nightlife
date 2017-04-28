import { FormControl } from "@angular/forms";
import { MdDialog } from '@angular/material';
import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';

import { IdentityService, PlaceService } from '../shared/services';
import { Place } from '../shared/models';

interface ExtPlaceResult extends google.maps.places.PlaceResult {
    people: string[];
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

    private isAlive = true;

    public places: ExtPlaceResult[] = [];

    public placesRows: number[] = [];

    public searchControl = new FormControl();

    private searchService: google.maps.places.PlacesService;

    constructor(
        private zone: NgZone,
        private identityService: IdentityService,
        private placeService: PlaceService
    ) { }

    ngOnInit(): void {
        let map = new google.maps.Map(document.getElementById('results'));
        this.searchService = new google.maps.places.PlacesService(map);
        this.searchControl.valueChanges
            .debounceTime(500)
            .takeWhile(() => this.isAlive)
            .distinctUntilChanged()
            .subscribe((value) => {
                this.places = [];

                if (!value) return;

                value = 'bar near ' + value;

                let request: google.maps.places.TextSearchRequest = {
                    query: value
                };

                this.searchService.textSearch(request, (res) => {
                    this.zone.run(() => {
                        this.places = res.map((p: ExtPlaceResult) => {
                            p.people = [];
                            return p;
                        });
                        this.placesRows = [];
                        for (var i = 0; i < Math.ceil(res.length / 3); i++) {
                            this.placesRows.push(i);
                        }
                    });
                });
            });
    }

    public go(index: number) {
        this.places[index].people.push(this.identityService.identity.email);
        this.placeService.post({
            _id: this.places[index].place_id,
            people: this.places[index].people
        });
    }

    public remove(index: number) {
        let idx = this.places[index].people.indexOf(this.identityService.identity.email);
        if (idx != -1) {
            this.places[index].people.slice(idx, 1);
        }
    }

    ngOnDestroy() {
        this.isAlive = false;
    }
}

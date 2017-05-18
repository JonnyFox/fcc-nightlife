import { Identity } from '../shared';
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

    public identity: Identity;

    constructor(
        private zone: NgZone,
        private identityService: IdentityService,
        private placeService: PlaceService
    ) { }

    ngOnInit(): void {
        this.searchControl.valueChanges
            .takeWhile(() => this.isAlive)
            .debounceTime(500)
            .distinctUntilChanged()
            .filter(i => i != null && i != '')
            .do(i => this.places = this.placesRows = [])
            .switchMap((value) => this.placeService.search(value))
            .subscribe((res: any) => {
                this.places = res;
                for (var i = 0; i < Math.ceil(this.places.length / 3); i++) {
                    this.placesRows.push(i);
                }
            });

        this.identityService.$identity.subscribe(identity => this.identity = identity);
    }

    public go(index: number) {
        if (!this.places[index].people.some(p => p === this.identity.email)) {
            let tempPeople = this.places[index].people;
            tempPeople.push(this.identity.email);
            this.placeService.put(this.places[index].place_id, {
                _id: this.places[index].place_id,
                people: this.places[index].people
            }).subscribe(() => {
                this.places[index].people.push(this.identity.email);
            });
        }
    }

    public remove(index: number) {
        let idx = this.places[index].people.indexOf(this.identity.email);
        if (idx != -1) {
            this.places[index].people.slice(idx, 1);
        }
    }

    ngOnDestroy() {
        this.isAlive = false;
    }
}

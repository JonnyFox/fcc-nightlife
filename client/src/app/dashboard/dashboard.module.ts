import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule, MdSnackBarModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PlaceService } from '../shared/services';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    providers: [
        PlaceService
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardModule { }

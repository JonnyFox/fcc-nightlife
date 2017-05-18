import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { CanActivateAuthGuard } from './can-activate-auth-guard';

const appRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [CanActivateAuthGuard] },
];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardRoutingModule { }

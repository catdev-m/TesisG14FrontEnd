import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuardGuard } from './guards/auth-guard/auth-guard.guard';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '', component: AppLayoutComponent,
                    children:
                        [
                            {   path: 'admin',
                                loadChildren: () => import('./modules/administration/administration.module').then(m => m.AdministrationModule)
                            },
                            {
                                path:'org',
                                loadChildren:()=>import('./modules/organization/organization.module').then(m=>m.OrganizationModule)
                            }
                        ]
                },
                { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload'
            }
        )],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

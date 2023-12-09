import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { RolesComponent } from './components/roles/roles.component';
import { MenusComponent } from './components/roles/menus/menus.component';
import { PermissionsComponent } from './components/roles/permissions/permissions.component';
import { UserRolesComponent } from './components/users/user-roles/user-roles.component';

const routes: Routes = [
	{
		path:'users',
		component:UsersComponent
	},
    {
		path:'users/:userId/roles',
		component:UserRolesComponent
	},
	{
		path:'roles',
		component:RolesComponent
	},
	{
		path:'roles/menus',
		component:MenusComponent
	},
	{
		path:'roles/permissions',
		component:PermissionsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class AdministrationRoutingModule { }

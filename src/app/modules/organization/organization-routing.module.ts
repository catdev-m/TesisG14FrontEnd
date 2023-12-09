import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacultiesComponent } from './components/faculties/faculties.component';
import { SchoolsComponent } from './components/schools/schools.component';
import { DepartmentsComponent } from './components/departments/departments.component';

const routes: Routes = [
    {
		path:'faculties',
		component:FacultiesComponent
	},
    {
        path:'schools',
        component:SchoolsComponent
    },
    {
        path:'departments',
        component:DepartmentsComponent
    },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }

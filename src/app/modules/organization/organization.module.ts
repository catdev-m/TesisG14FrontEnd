import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';

import { OrganizationRoutingModule } from './organization-routing.module';
import { FacultiesComponent } from './components/faculties/faculties.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { SchoolsComponent } from './components/schools/schools.component';
import { FacultyComponent } from './components/faculties/faculty/faculty.component';
import { SharedModule } from '../shared/shared.module';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DepartmentComponent } from './components/departments/department/department.component';

@NgModule({
  declarations: [
    FacultiesComponent,
    DepartmentsComponent,
    SchoolsComponent,
    FacultyComponent,
    DepartmentComponent
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    TableModule,
    ChipModule,
    ButtonModule,
    InputTextModule,
    DynamicDialogModule,
    DividerModule,
    ToastModule,
    TooltipModule,
    InputTextModule,
    SharedModule,
    InputSwitchModule,
    InputTextareaModule,
    ReactiveFormsModule,
    DropdownModule

  ]
})
export class OrganizationModule { }

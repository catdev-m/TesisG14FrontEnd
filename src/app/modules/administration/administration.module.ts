import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { UsersComponent } from './components/users/users.component';
import { RolesComponent } from './components/roles/roles.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { CreatUserComponent } from './components/users/create-user/create-user.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { CreateRolComponent } from './components/roles/create-rol/create-rol.component';
import { MenusComponent } from './components/roles/menus/menus.component';
import { PermissionsComponent } from './components/roles/permissions/permissions.component';
import { SharedModule } from '../shared/shared.module';
import { UserRolesComponent } from './components/users/user-roles/user-roles.component';

import { TableModule } from 'primeng/table';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PickListModule } from 'primeng/picklist';




@NgModule({
  declarations: [
    UsersComponent,
    RolesComponent,
    CreatUserComponent,
    EditUserComponent,
    CreateRolComponent,
    MenusComponent,
    PermissionsComponent,
    UserRolesComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    TableModule,
    ChipModule,
    ButtonModule,
    SkeletonModule,
    ProgressSpinnerModule,
    InputTextModule,
    DynamicDialogModule,
    ReactiveFormsModule,
    PasswordModule,
    DividerModule,
    ToastModule,
    TooltipModule,
    InputSwitchModule,
    InputTextareaModule,
    PickListModule,
    SharedModule
  ]
})
export class AdministrationModule { }

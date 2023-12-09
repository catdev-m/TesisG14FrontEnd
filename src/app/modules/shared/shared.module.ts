import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonTableComponent } from './components/skeleton-table/skeleton-table.component';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { SkeletonPicklistComponent } from './components/skeleton-picklist/skeleton-picklist.component';
import { PanelModule } from 'primeng/panel';

@NgModule({
  declarations: [
    SkeletonTableComponent,
    SkeletonPicklistComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    SkeletonModule,
    PanelModule
  ], exports: [
    SkeletonTableComponent,
    SkeletonPicklistComponent
  ]
})
export class SharedModule { }

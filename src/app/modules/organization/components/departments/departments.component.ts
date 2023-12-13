import { Faculty } from 'src/app/interfaces/organization/faculty';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Component } from '@angular/core';
import { BreadCrumbService } from 'src/app/services/shared/bread-crumb/bread-crumb.service';
import { MenuItem, MessageService } from 'primeng/api';
import { Department } from 'src/app/interfaces/organization/department';
import { DepartmentService } from 'src/app/services/organization/department/department.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DepartmentComponent } from './department/department.component';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
  providers:[MessageService,DialogService]
})
export class DepartmentsComponent {

    faculty:Faculty
    dtLoading:boolean;
    loading:boolean= false;
    departments:Department[]=[];
    ref:DynamicDialogRef | undefined;
    toltipOptions:any;

    constructor(private departmentService: DepartmentService,
        public breadCrumbService : BreadCrumbService,
        public dialogService: DialogService,
        localStorageService:LocalStorageService,
        private messageService: MessageService){
            let struser = localStorageService.getItem('u537');
            let user = JSON.parse(struser!);
            this.faculty = user.faculty;

        }

    ngOnInit(){
        this.setBreadCrumbs();
		this.loadDepartments();

        this.toltipOptions = {
			showDelay: 1000,
			autoHide: false,
			tooltipEvent: 'hover',
			tooltipPosition: 'top',
			positionTop:-20
		};
    }

    createDepartment(){
		this.ref = this.dialogService.open(
			DepartmentComponent,
			{
				header:'Agregar departamento',
				width:'500px',
                data:{
					actionType:'create',
                    faculty:this.faculty,
                    department:null
				}
			}
		);

		this.ref.onClose.subscribe((res)=>{
			if(res){
				if(res.success){
					this.departments.push(res.data);
					this.messageService.add({
						severity: 'success',
						summary: 'Success',
						detail: 'Se ha agregado la facultad.'
					});
				}else{
					this.messageService.add({
						severity: 'error',
						summary: 'Error',
						detail: 'Ha ocurrido un error processando la solicitud'
					});
				}
			}
		});
    }

    udpateDepartment(department:Department){
        this.ref = this.dialogService.open(
			DepartmentComponent,
			{
				header:'Editar departamento',
				width:'500px',
                data:{
					actionType:'update',
					department:department,
                    faculty:this.faculty
				}
			}
		);

		this.ref.onClose.subscribe((res)=>{
			if(res){
				if(res.success){
					let index = this.departments.findIndex((item:Department)=>item.departmentId==res.data.departmentId);
					if(index != -1)
						this.departments[index] = res.data;

					this.messageService.add({
						severity: 'success',
						summary: 'Success',
						detail: 'Se ha actualizado la facultad correctamente.'
					});
				}else{
					this.messageService.add({
						severity: 'error',
						summary: 'Error',
						detail: 'Ha ocurrido un error al procesar la solicitud.'
					});
				}
			}
		});
    }

    loadDepartments(){
        this.loading=true;
		this.departmentService.fetchAll(this.faculty.facultyId.toString()).subscribe((res)=>{
			if(res.success==true){
				this.departments = res.data;
			}
			this.loading=false;
		});
    }

    setBreadCrumbs(){
		let menus:MenuItem[]=[
			{label:'Memories',disabled:true},
			{label:'Organizacion',disabled:true},
			{label:'Departamentos'}
		];
		this.breadCrumbService.setViewBreadCrumb(menus);
	}
}

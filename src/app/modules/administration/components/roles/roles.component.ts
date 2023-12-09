import { Component } from '@angular/core';
import { BreadCrumbService } from 'src/app/services/shared/bread-crumb/bread-crumb.service';
import { MenuItem,MessageService } from 'primeng/api';
import { Rol } from 'src/app/interfaces/administration/rol';
import { RolService } from 'src/app/services/administration/rol/rol.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateRolComponent } from './create-rol/create-rol.component';
import { Router } from '@angular/router';


@Component({
	selector: 'app-roles',
	templateUrl: './roles.component.html',
	styleUrls: ['./roles.component.scss'],
	providers:[DialogService,MessageService]
})
export class RolesComponent {
	rolesList:Rol[]=[];
	isloading:boolean=false;
	pageSize:number=100;
	toltipOptions:any;
	ref:DynamicDialogRef | undefined;

	constructor(public breadCrumbService:BreadCrumbService,
				public dialogService: DialogService,
				private messageService: MessageService,
				private route:Router,
				public rolService:RolService){}

	ngOnInit(){
		this.loadRoles();
		this.setBreadCrumbs();
		this.initializeComponent();
	}

	createRol(){
		this.ref = this.dialogService.open(
			CreateRolComponent,
			{
				header:'Agregar rol.',
				width:'500px',
				data:{
					actionType:'create',
					rol:null
				}
			}
		);
		this.ref.onClose.subscribe((res)=>{
			if(res){
				if(res.success){
					this.rolesList.push(res.data);
					this.messageService.add({
						severity: 'success',
						summary: 'Success',
						detail: 'Rol agregado con exito.'
					});
				}else{
					this.messageService.add({
						severity: 'error',
						summary: 'Error',
						detail: 'Ha ocurrido un error'
					});
				}
			}
		});
	}

	updateRol(rol:Rol){
		this.ref = this.dialogService.open(
			CreateRolComponent,
			{
				header:'Actualizar rol',
				width:'500px',
				data:{
					actionType:'update',
					rol:rol
				}
			}
		);

		this.ref.onClose.subscribe((res)=>{
			if(res){
				if(res.success){
					let index = this.rolesList.findIndex((item:Rol)=>item.rolId==res.data.rolId);
					if(index != -1)
						this.rolesList[index] = res.data;

					this.messageService.add({
						severity: 'success',
						summary: 'Success',
						detail: 'El rol ha sido actualizado.'
					});
				}else{
					this.messageService.add({
						severity: 'error',
						summary: 'Error',
						detail: 'Ha ocurrido un error.'
					});
				}
			}
		});
	}

	loadRoles(){
		this.isloading=true;
		this.rolService.fetchRoles().subscribe((res)=>{
			if(res.success==true){
				this.rolesList = res.data;
			}
			this.isloading=false;
		});
	}

	setBreadCrumbs(){
		let menus:MenuItem[]=[
			{label:'Memories',disabled:true},
			{label:'Administracion',disabled:true},
			{label:'Roles'}
		];
		this.breadCrumbService.setViewBreadCrumb(menus);
	}

	initializeComponent(){
		this.toltipOptions = {
			showDelay: 1000,
			autoHide: false,
			tooltipEvent: 'hover',
			tooltipPosition: 'top',
			positionTop:-20
		};
	}

	goToMenu(rol:Rol){
		this.route.navigate(
			['admin/roles/menus'],
			{
				queryParams:{
					rolId:rol.rolId,
					rolName:rol.name
				}
			});
	}

    goToPermissions(rol:Rol){
        this.route.navigate(
			['admin/roles/permissions'],
			{
				queryParams:{
					rolId:rol.rolId,
					rolName:rol.name
				}
			});
    }
}

import { Component } from '@angular/core';

import { User } from 'src/app/interfaces/administration/user';
import { UserService } from 'src/app/services/memories/user/user.service';
import { Table } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreatUserComponent } from './create-user/create-user.component';
import { MenuItem, MessageService } from 'primeng/api';
import { BreadCrumbService } from 'src/app/services/shared/bread-crumb/bread-crumb.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss'],
	providers:[DialogService,MessageService]
})
export class UsersComponent {
	isLoadingUsers:boolean=false;
	usersList: User[];
	selectedUser:User | undefined;
	ref:DynamicDialogRef | undefined;

	constructor(public dialogService: DialogService,
				private messageService: MessageService,
				public breadCrumbService : BreadCrumbService,
                private route:Router,
				private usersService: UserService){}

	ngOnInit(){
		this.setBreadCrumbs();
		this.loadUsers();
	}

	loadUsers(){
		this.isLoadingUsers = true;
		this.usersService.getAllUsers().subscribe(res=>{
            if(res.success){
                this.usersList = res.data;
                this.isLoadingUsers = false;
            }

		});
	}

	createUser(){
		this.ref = this.dialogService.open(
			CreatUserComponent,
			{
				header:'Agregar usuario.',
				width:'500px'
			}
		);
		this.ref.onClose.subscribe((res)=>{

			if(res){
				if(res.success){
					this.usersList.push(res.user);
					this.messageService.add({
						severity: 'success',
						summary: 'Success',
						detail: 'Usuario agregado con exito.'
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

	clear(table: Table) {
        table.clear();
    }

	setBreadCrumbs(){
		let menus:MenuItem[]=[
			{label:'Memories',disabled:true},
			{label:'Administracion',disabled:true},
			{label:'Usuarios'}
		];
		this.breadCrumbService.setViewBreadCrumb(menus);
	}
}

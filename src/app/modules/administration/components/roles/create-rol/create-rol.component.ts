import { Component, Input } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { RolService } from 'src/app/services/administration/rol/rol.service';
import { DynamicDialogConfig,DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { Guid } from 'typescript-guid';
import { Rol } from 'src/app/interfaces/administration/rol';

@Component({
	selector: 'app-create-rol',
	templateUrl: './create-rol.component.html',
	styleUrls: ['./create-rol.component.scss'],
	providers:[MessageService]
})

export class CreateRolComponent {
	//#region attributes
	actionType:string;
	rolForm:FormGroup;
	loading:boolean=false;
	selectedRol:Rol;
	//#endregion

	constructor(private formBuilder:FormBuilder,
				public ref:DynamicDialogRef,
				private messageService: MessageService,
				public config:DynamicDialogConfig,
				private rolService:RolService){
	}


	ngOnInit(){
		this.inizializeComponent();
	}

	inizializeComponent(){
		this.actionType=this.config.data.actionType;
		switch(this.actionType){
			case 'create':
				this.buildRolForm();
			break;
			case 'update':
				this.selectedRol = this.config.data.rol;
				this.buildUpdateForm();
			break;
		}
	}

	buildUpdateForm(){
		this.rolForm=this.formBuilder.group({
			rolId:[this.selectedRol.rolId,[Validators.required]],
			name:[this.selectedRol.name,[Validators.required,Validators.min(3),Validators.max(100)]],
			active:[this.selectedRol.active,Validators.required],
			description:[this.selectedRol.description,[Validators.required,Validators.min(3),Validators.max(250)]]
		});
	}

	buildRolForm(){
		this.rolForm=this.formBuilder.group({
			rolId:[Guid.create().toString(),[Validators.required]],
			name:[null,[Validators.required,Validators.min(3),Validators.max(100)]],
			active:[true,Validators.required],
			description:[null,[Validators.required,Validators.min(3),Validators.max(250)]]
		});
	}

	createRol(){
		this.loading=true;
		var data = this.rolForm.value;
		this.rolService.createRol(data).subscribe((res)=>{
			if(res.success){
				this.loading=false;
				this.ref.close({data:res.data,success:true});
			}
		},(err)=>{
			this.loading=false;
			this.messageService.add({
				key:'mainToast',
				severity: 'error',
				summary: 'Error',
				detail: 'Ha ocurrido un error'
			});
		});
	}

	updateRol(){
		this.loading=true;
		var data = this.rolForm.value;
		this.rolService.updateRol(data).subscribe((res)=>{
			if(res.success){
				this.loading=false;
				this.ref.close({data:res.data,success:true});
			}
		},(err)=>{
			this.loading=false;
			this.messageService.add({
				key:'mainToast',
				severity: 'error',
				summary: 'Error',
				detail: 'Ha ocurrido un error'
			});
		});
	}

	closeModal(){
		this.ref.close();
	}
}

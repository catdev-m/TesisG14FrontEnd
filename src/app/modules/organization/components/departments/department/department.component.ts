
import { Component } from '@angular/core';
import { Guid } from 'typescript-guid';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig,DynamicDialogRef } from 'primeng/dynamicdialog';
import { Faculty } from 'src/app/interfaces/organization/faculty';
import { Department } from 'src/app/interfaces/organization/department';
import { MessageService } from 'primeng/api';
import { DepartmentService } from 'src/app/services/organization/department/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})

export class DepartmentComponent {
    loading:boolean;
    actionType:string;
    depForm: FormGroup;
    faculty:Faculty;
    selectedDep:Department;

    facultiesOptions:Faculty[];

    constructor(private fb : FormBuilder,
        private depService:DepartmentService,
        public config:DynamicDialogConfig,
        private messageService: MessageService,
        public ref:DynamicDialogRef,)
    {}

    ngOnInit(){
        this.actionType=this.config.data.actionType;
        this.faculty = this.config.data.faculty;

		switch(this.actionType){
			case 'create':
				this.buildForm();
			break;
			case 'update':
                this.selectedDep= this.config.data.department;
				this.buildUpdateForm();
			break;
		}
        this.facultiesOptions=[this.faculty];
    }


    buildForm(){
		this.depForm = this.fb.group({
			departmentId:[Guid.create().toString(),[Validators.required]],
            facultyId:[this.faculty.facultyId.toString(),[Validators.required]],
			name:['',[Validators.required]],
            active:[true,[Validators.required]],
		});
	}

    buildUpdateForm(){
        this.depForm = this.fb.group({
            departmentId:[this.selectedDep.departmentId.toString(),[Validators.required]],
            facultyId:[this.selectedDep.facultyId.toString(),[Validators.required]],
			name:[this.selectedDep.name,[Validators.required]],
            active:[this.selectedDep.active,[Validators.required]],
        });
    }

    create(){
        this.loading=true;
        let dep:Department = this.depForm.value;
		this.depService.create(dep).subscribe((res)=>{
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
				detail: 'No se ha logrado processar la solicitud'
			});
		});
    }

    update(){
        this.loading=true;
		var data = this.depForm.value;
		this.depService.update(data).subscribe((res)=>{
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

    close(){
        this.ref.close();
    }

}

import { Component } from '@angular/core';
import { Guid } from 'typescript-guid';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig,DynamicDialogRef } from 'primeng/dynamicdialog';
import { Faculty } from 'src/app/interfaces/organization/faculty';
import { FacultiesService } from 'src/app/services/organization/faculties/faculties.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss'],
  providers:[MessageService]
})
export class FacultyComponent
{
    loading:boolean;
    actionType:string;
    facultyForm: FormGroup;
    selectedFaculty:Faculty;

    constructor(private fb : FormBuilder,
                private facultyService:FacultiesService,
                public config:DynamicDialogConfig,
                private messageService: MessageService,
                public ref:DynamicDialogRef,
        )
    {}

    ngOnInit(){
        this.buildForm();
        this.actionType=this.config.data.actionType;
		switch(this.actionType){
			case 'create':
				this.buildForm();
			break;
			case 'update':
				this.selectedFaculty = this.config.data.faculty;
				this.buildUpdateForm();
			break;
		}

    }

    buildForm(){
		this.facultyForm = this.fb.group({
			facultyId:[Guid.create().toString(),[Validators.required]],
			name:['',[Validators.required]],
			description:['',[Validators.required]],
            active:[true,[Validators.required]],
		});
	}

    buildUpdateForm(){
        this.facultyForm = this.fb.group({
            facultyId:[this.selectedFaculty.facultyId.toString(),[Validators.required]],
			name:[this.selectedFaculty.name,[Validators.required]],
			description:[this.selectedFaculty.description,[Validators.required]],
            active:[this.selectedFaculty.active,[Validators.required]],
        });
    }

    create(){
        this.loading=true;
        let faculty:Faculty = this.facultyForm.value;
		this.facultyService.create(faculty).subscribe((res)=>{
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
		var data = this.facultyForm.value;
		this.facultyService.update(data).subscribe((res)=>{
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

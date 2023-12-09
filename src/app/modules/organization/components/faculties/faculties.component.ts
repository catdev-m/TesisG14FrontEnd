import { Component } from '@angular/core';
import { BreadCrumbService } from 'src/app/services/shared/bread-crumb/bread-crumb.service';
import { MenuItem, MessageService } from 'primeng/api';
import { Faculty } from 'src/app/interfaces/organization/faculty';
import { FacultiesService } from 'src/app/services/organization/faculties/faculties.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FacultyComponent } from './faculty/faculty.component';

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: ['./faculties.component.scss'],
  providers:[MessageService,DialogService]
})
export class FacultiesComponent {
    dtLoading:boolean;
    loading:boolean= false;
    faculties:Faculty[]=[];
    ref:DynamicDialogRef | undefined;
    toltipOptions:any;

    constructor(private facultyService: FacultiesService,
                public breadCrumbService : BreadCrumbService,
                public dialogService: DialogService,
                private messageService: MessageService,)
    {}

    ngOnInit(){
		this.setBreadCrumbs();
		this.loadFaculties();

        this.toltipOptions = {
			showDelay: 1000,
			autoHide: false,
			tooltipEvent: 'hover',
			tooltipPosition: 'top',
			positionTop:-20
		};
	}

    createFaculty(){
		this.ref = this.dialogService.open(
			FacultyComponent,
			{
				header:'Agregar facultad',
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
					this.faculties.push(res.data);
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

    udpateFaculty(faculty:Faculty){
        this.ref = this.dialogService.open(
			FacultyComponent,
			{
				header:'Editar facultad',
				width:'500px',
                data:{
					actionType:'update',
					faculty:faculty
				}
			}
		);

		this.ref.onClose.subscribe((res)=>{
			if(res){
				if(res.success){
					let index = this.faculties.findIndex((item:Faculty)=>item.facultyId==res.data.facultyId);
					if(index != -1)
						this.faculties[index] = res.data;

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

    loadFaculties(){
        this.loading=true;
		this.facultyService.fetchAll().subscribe((res)=>{
			if(res.success==true){
				this.faculties = res.data;
			}
			this.loading=false;
		});
    }

    setBreadCrumbs(){
		let menus:MenuItem[]=[
			{label:'Memories',disabled:true},
			{label:'Organizacion',disabled:true},
			{label:'Facultades'}
		];
		this.breadCrumbService.setViewBreadCrumb(menus);
	}
}

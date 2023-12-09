import { Component,ChangeDetectorRef } from '@angular/core';

import { MenuItem,MessageService } from 'primeng/api';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BreadCrumbService } from 'src/app/services/shared/bread-crumb/bread-crumb.service';
import { Rol } from 'src/app/interfaces/administration/rol';
import { RolService } from 'src/app/services/administration/rol/rol.service';
import { UserService } from 'src/app/services/administration/user/user.service';
import { Guid } from 'typescript-guid';


@Component({
    selector: 'app-user-roles',
    templateUrl: './user-roles.component.html',
    styleUrls: ['./user-roles.component.scss'],
	providers:[MessageService]
})

export class UserRolesComponent {

    loading:boolean= false;
    userId:Guid;
    source!:Rol[];
    target!:Rol[];

    constructor(
        private route:ActivatedRoute,
        private cdr: ChangeDetectorRef,
        private userService:UserService,
        private rolService:RolService,
        private messageService: MessageService,
        private breadCrumbService:BreadCrumbService){

    }

    ngOnInit(){
        this.setBreadCrumbs();

        this.userId=Guid.parse(this.route.snapshot.paramMap.get('userId')!);
        this.loadPickList();
    }

    loadPickList(){
        let pvtTarget:Rol[]=[];
        let pvtSource:Rol[]=[];

        this.loading = true;

        this.userService.fetchRolesByUser(this.userId).subscribe(res=>{
            if(res.success){
                pvtTarget = res.data;
                this.rolService.fetchRoles().subscribe(ress=>{
                    if(ress.success){
                        pvtSource= ress.data
                        this.initializePickList(pvtSource,pvtTarget);
                    }
                });

            }
        });
    }

    initializePickList(source:Rol[],target:Rol[]){
        target.forEach(elem=>{
            let index = source.findIndex(it=>it.rolId == elem.rolId);
            if(index != -1){
                source.splice(index,1);
            }
        });
        this.source =source;
        this.target = target;
        this.cdr.markForCheck();
        this.loading = false;
    }

    setBreadCrumbs(){
        let menus:MenuItem[]=[
            {label:'Memories',disabled:true},
            {label:'Administracion',disabled:true},
            {label:'Usuarios',routerLink:'admin/users'},
            {label:'Roles'}
        ];
        this.breadCrumbService.setViewBreadCrumb(menus);
	}

    addRol(pickList:any){
        let rol:Rol = pickList.items[0];
        var data = {
            code:Guid.create().toString(),
            rolId:rol.rolId,
            userId:this.userId.toString()
        };

        this.userService.addRolToUser(data,this.userId).subscribe(res => {
            if(res.success && res.data){
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Se ha agregado el rol correctamente'
                });
            }else{
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Ha ocurrido un error en la solicitud.'
                });
            }
        });
    }

    removeRol(pickList:any){
        let rol:Rol = pickList.items[0];
        var data = {
            code:Guid.create().toString(),
            rolId:rol.rolId,
            userId:this.userId.toString()
        };

        this.userService.removeRolFromUser(data,this.userId).subscribe(res => {
            if(res.success && res.data){
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Se ha eliminado el rol correctamente.'
                });
            }else{
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Ha ocurrido un error en la solicitud.'
                });
            }
        });
    }

}

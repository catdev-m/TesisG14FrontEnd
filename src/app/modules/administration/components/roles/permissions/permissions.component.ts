
import { Component,ChangeDetectorRef } from '@angular/core';
import { ParamMap,ActivatedRoute } from '@angular/router';
import { BreadCrumbService } from 'src/app/services/shared/bread-crumb/bread-crumb.service';
import { MenuItem,MessageService } from 'primeng/api';
import { PermissionService } from 'src/app/services/administration/permission/permission.service';
import { Permission } from 'src/app/interfaces/administration/permission';
import { Guid } from 'typescript-guid';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
  providers:[MessageService]
})

export class PermissionsComponent {
    loadingPermissions:boolean;
    rolId:string|null;
    rolName:string|null;
    source!:Permission[];
    target!:Permission[];

    constructor(private route:ActivatedRoute,
                private permissionService:PermissionService,
                private cdr: ChangeDetectorRef,
                private messageService: MessageService,
                private breadCrumbService:BreadCrumbService){}

    ngOnInit(){
        this.initializeComponent();
    }

    initializeComponent(){
        this.setBreadCrumbs();
        this.route.queryParamMap.subscribe((params:ParamMap)=>{
            this.rolId  =params.get('rolId');
            this.rolName = params.get('rolName');
            if(this.rolId ==null)
                this.rolName='Error in data';

            this.loadPickList();
        });
    }

    setBreadCrumbs(){
        let menus:MenuItem[]=[
            {label:'Memories',disabled:true},
            {label:'Administracion',disabled:true},
            {label:'Roles',routerLink:'admin/roles'},
            {label:'Permisos'}
        ];
        this.breadCrumbService.setViewBreadCrumb(menus);
    }

    loadPickList(){
        this.loadingPermissions = true;
        let pvtTarget:Permission[]=[];
        let pvtSource:Permission[]=[];
        this.permissionService.searchPermissionOfRol(this.rolId!).subscribe(res=>{
            if(res.success){
                pvtTarget = res.data;
                this.permissionService.fetchAll().subscribe(ress=>{
                    if(ress.success){
                        pvtSource= ress.data
                        this.initializePickList(pvtSource,pvtTarget);
                    }
                });

            }
        });
    }

    initializePickList(source:Permission[],target:Permission[]){
        target.forEach(elem=>{
            let index = source.findIndex(it=>it.code == elem.code);
            if(index != -1){
                source.splice(index,1);
            }
        });
        this.source =source;
        this.target = target;
        this.cdr.markForCheck();
        this.loadingPermissions = false;
    }

    addPermissionToRol(pickList:any){
        let permission:Permission = pickList.items[0];
        var data = {
            code:Guid.create().toString(),
            rolCode:this.rolId,
            permissionCode:permission.code
        };

        this.permissionService.addPermissionToRol(data).subscribe(res => {
            if(res.success && res.data){
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Se ha agregado el permiso'
                });
            }else{
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se ha logrado procesar los cambios'
                });
            }
        });

    }

    removePermissionFromRol(pickList:any){
        let permission:Permission = pickList.items[0];
        var data = {
            code:Guid.create().toString(),
            rolCode:this.rolId,
            permissionCode:permission.code
        };

        this.permissionService.deletePermissionFromRol(data).subscribe(res => {
            if(res.success && res.data){
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Se ha removido el permiso'
                });
            }else{
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se ha logrado procesar los cambios'
                });
            }
        });

    }
}

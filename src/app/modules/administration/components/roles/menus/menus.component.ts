import { Component,ChangeDetectorRef } from '@angular/core';
import { ParamMap,ActivatedRoute } from '@angular/router';
import { BreadCrumbService } from 'src/app/services/shared/bread-crumb/bread-crumb.service';
import { MenuItem,MessageService } from 'primeng/api';
import { MenusService } from 'src/app/services/administration/menus/menus.service';
import { MenuPickItem } from 'src/app/interfaces/administration/menu-item-picklist';
import { RolService } from 'src/app/services/administration/rol/rol.service';
import { Guid } from 'typescript-guid';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss'],
  providers:[MessageService]
})
export class MenusComponent {

    loadingMenu:boolean;
    rolId:string|null;
    rolName:string|null;
    sourceMenus!:MenuPickItem[];
    targetMenus!:MenuPickItem[];

    constructor(private route:ActivatedRoute,
                private menuService:MenusService,
                private rolService:RolService,
                private cdr: ChangeDetectorRef,
                private messageService: MessageService,
                private breadCrumbService:BreadCrumbService){

    }

    ngOnInit(){
        this.initializeComponents();
    }

    initializeComponents(){
        this.route.queryParamMap.subscribe((params:ParamMap)=>{
            this.rolId  =params.get('rolId');
            this.rolName = params.get('rolName');
            if(this.rolId ==null)
                this.rolId='Error in data';
            this.setBreadCrumbs();
            this.loadPickList();
        });
    }

    setBreadCrumbs(){
        let menus:MenuItem[]=[
            {label:'Memories',disabled:true},
            {label:'Administracion',disabled:true},
            {label:'Roles',routerLink:'admin/roles'},
            {label:'Menus'}
        ];
        this.breadCrumbService.setViewBreadCrumb(menus);
    }

    loadPickList(){
        this.loadingMenu = true;
        let pvtTarget:MenuPickItem[]=[];
        let pvtSource:MenuPickItem[]=[];
        //llenamos los menus que poseen;
        this.rolService.fetchMenusByRol(this.rolId!).subscribe(res=>{
            if(res.success){
                res.data.forEach(item=>{
                        let current:MenuPickItem = {
                            code:item.code,
                            icon:item.icon,
                            name:item.name,
                            parent:null
                        }
                        pvtTarget.push(current);
                });
                this.menuService.fetchAll().subscribe(res=>{
                    if(res.success){
                        res.data.forEach(item=>{
                            let parent:MenuPickItem = {
                                code:item.code,
                                name:item.name,
                                parent:null,
                                icon:item.icon
                            };
                            pvtSource.push(parent);
                        });
                        this.initializePickList(pvtSource,pvtTarget);
                    }
                });

            }
        });
    }

    initializePickList(source:MenuPickItem[],target:MenuPickItem[]){
        target.forEach(elem=>{
            let index = source.findIndex(it=>it.code == elem.code);
            if(index != -1){
                source.splice(index,1);
            }
        });
        this.sourceMenus =source;
        this.targetMenus = target;
        this.cdr.markForCheck();
        this.loadingMenu = false;
    }

    addMenuToRol(menus:any){

        let menu:MenuPickItem = menus.items[0];
        var data = {
            code:Guid.create().toString(),
            rolCode:this.rolId,
            menuCode:menu.code
        };

        this.rolService.addMenuForRol(data).subscribe(res => {
            if(res.success && res.data){
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'El rol ha sido actualizado.'
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

    removeMenuToRol(menus:any){
        let menu:MenuPickItem = menus.items[0];
        var data = {
            rolCode:this.rolId,
            menuCode:menu.code
        };

        this.rolService.deleteMenuForRol(data).subscribe(res => {
            if(res.success && res.data){
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'El rol ha sido actualizado.'
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

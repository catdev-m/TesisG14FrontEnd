
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../../service/app.layout.service';
import { LogedUser } from 'src/app/interfaces/auth/loged-user';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Menu } from 'src/app/interfaces/auth/menu';
import { LayoutMenu } from 'src/app/interfaces/auth/layout-menu';
import { LayoutSubMenu } from 'src/app/interfaces/auth/layout-sub-menu';
import { LayoutMainMenu } from 'src/app/interfaces/auth/layout-main-menu';
import { User } from 'src/app/interfaces/administration/user';
import { Permission } from 'src/app/interfaces/auth/permission';


@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    logedUser!:LogedUser;
    model:any[]=[];

    constructor(
                private authService:AuthService,
                private localStorageService:LocalStorageService,
                public layoutService: LayoutService
                )
    {
        this.loadUserDetail();
    }

    ngOnInit() {
        // this.model = [
        //     {
        //         label: 'Memoria de labores',
        //         icon: 'pi pi-fw pi-briefcase',
        //         items: [
        //             {
        //                 label: 'Auth',
        //                 icon: 'pi pi-fw pi-user',
        //                 items: [
        //                     {
        //                         label: 'Login',
        //                         icon: 'pi pi-fw pi-sign-in',
        //                         routerLink: ['/auth/login']
        //                     },
        //                     {
        //                         label: 'Error',
        //                         icon: 'pi pi-fw pi-times-circle',
        //                         routerLink: ['/auth/error']
        //                     },
        //                     {
        //                         label: 'Access Denied',
        //                         icon: 'pi pi-fw pi-lock',
        //                         routerLink: ['/auth/access']
        //                     }
        //                 ]
        //             }
        //         ]
        //     }
        // ];
        //this.loadUserDetail();
    }

    loadUserDetail(){
        let menus = this.localStorageService.getItem('m3u5');

        this.modelMenus(JSON.parse(menus!));
    }

    modelMenus(menus:Menu[]){
        let mainMenu:LayoutMainMenu[]=[];
        let menusPvt = menus?.filter((m)=>m.parent == null);
        let main:LayoutMainMenu=
            {
                label: 'Memoria de labores',
                items: []
            }
        ;

        menusPvt?.forEach(function(item){
            let subMenus = menus?.filter(subMenuP => subMenuP.parent == item.code);
            let menu:LayoutMenu= {
                label: item.name,
                icon: item.icon,
                items:[],
            };

            subMenus?.forEach(element => {
                let shildMenu:LayoutSubMenu ={
                    label: element.name,
                    icon: element.icon,
                    routerLink: [element.url]
                }
                menu.items.push(shildMenu);
            });

            main.items.push(menu);
        });

        mainMenu.push(main);
        this.model = mainMenu;
    }


}

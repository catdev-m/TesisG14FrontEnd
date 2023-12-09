import { LocalStorageService } from './../services/local-storage/local-storage.service';
import { Component, OnDestroy, Renderer2, ViewChild, AfterContentChecked  } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable, Subscription } from 'rxjs';
import { LayoutService } from "./service/app.layout.service";
import { AppSidebarComponent } from './components/sidebar/app.sidebar.component';
import { AppTopBarComponent } from './components/topbar/app.topbar.component';
import { MenuItem } from 'primeng/api';
import { BreadCrumbService } from '../services/shared/bread-crumb/bread-crumb.service';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
@Component({
    selector: 'app-layout',
    templateUrl: './app.layout.component.html'
})
export class AppLayoutComponent implements OnDestroy {
    loadingInterface:boolean=false;
    breadcrumbItems$: Observable<MenuItem[]>;
    breadcrumbItems:MenuItem[];
    overlayMenuOpenSubscription: Subscription;
    menuOutsideClickListener: any;
    profileMenuOutsideClickListener: any;
    @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;
    @ViewChild(AppTopBarComponent) appTopbar!: AppTopBarComponent;

    constructor(public layoutService: LayoutService,
                public renderer: Renderer2,
                private lsService:LocalStorageService,
                private changeDetector:ChangeDetectorRef,
                private changeDetectorRef: ChangeDetectorRef,
                private authService:AuthService,
                public router: Router,
                public breadCrumbService:BreadCrumbService) {
        this.verifyLocalStorageContent();
        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                    const isOutsideClicked = !(this.appSidebar.el.nativeElement.isSameNode(event.target) || this.appSidebar.el.nativeElement.contains(event.target)
                        || this.appTopbar.menuButton.nativeElement.isSameNode(event.target) || this.appTopbar.menuButton.nativeElement.contains(event.target));

                    if (isOutsideClicked) {
                        this.hideMenu();
                    }
                });
            }

            if (!this.profileMenuOutsideClickListener) {
                this.profileMenuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                    const isOutsideClicked = !(this.appTopbar.menu.nativeElement.isSameNode(event.target) || this.appTopbar.menu.nativeElement.contains(event.target)
                        || this.appTopbar.topbarMenuButton.nativeElement.isSameNode(event.target) || this.appTopbar.topbarMenuButton.nativeElement.contains(event.target));

                    if (isOutsideClicked) {
                        this.hideProfileMenu();
                    }
                });
            }

            if (this.layoutService.state.staticMenuMobileActive) {
                this.blockBodyScroll();
            }
        });

        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.hideMenu();
                this.hideProfileMenu();
        });
        this.breadcrumbItems$ = breadCrumbService.breadCrumbList$;
    }

    ngAfterViewInit(){
        this.breadcrumbItems$.subscribe((list)=>{
            this.breadcrumbItems =list;
        });
        this.changeDetectorRef.detectChanges();
    }
    hideMenu() {
        this.layoutService.state.overlayMenuActive = false;
        this.layoutService.state.staticMenuMobileActive = false;
        this.layoutService.state.menuHoverActive = false;
        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
            this.menuOutsideClickListener = null;
        }
        this.unblockBodyScroll();
    }

    hideProfileMenu() {
        this.layoutService.state.profileSidebarVisible = false;
        if (this.profileMenuOutsideClickListener) {
            this.profileMenuOutsideClickListener();
            this.profileMenuOutsideClickListener = null;
        }
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        }
        else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        }
        else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    get containerClass() {
        return {
            'layout-theme-light': this.layoutService.config.colorScheme === 'light',
            'layout-theme-dark': this.layoutService.config.colorScheme === 'dark',
            'layout-overlay': this.layoutService.config.menuMode === 'overlay',
            'layout-static': this.layoutService.config.menuMode === 'static',
            'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config.menuMode === 'static',
            'layout-overlay-active': this.layoutService.state.overlayMenuActive,
            'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
            'p-input-filled': this.layoutService.config.inputStyle === 'filled',
            'p-ripple-disabled': !this.layoutService.config.ripple
        }
    }

    ngOnDestroy() {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }
    }

    verifyLocalStorageContent(){
        if(this.lsService.getItem('u537') == undefined || this.lsService.getItem('p3rm150s') == undefined || this.lsService.getItem('m3u5') == undefined){
            this.loadingInterface = true;
            let loggedUser = this.lsService.getItem('u537');

            let json = JSON.parse(loggedUser!);
            let data = {
                email : json.email,
            }
            this.authService.getPermissionsAdnRole(data).subscribe(res=>{
                if(res.success){
                    this.lsService.setItem('p3rm150s',JSON.stringify(res.data.permissions));
                    this.lsService.setItem('u537',JSON.stringify(res.data.user));
                    this.lsService.setItem('m3u5',JSON.stringify(res.data.menus));
                }
                this.loadingInterface= false;
            });

        }
    }
    ngAfterContentChecked(): void {
        this.changeDetector.detectChanges();
      }
}

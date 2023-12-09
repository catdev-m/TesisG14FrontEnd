import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { UserLogin } from 'src/app/interfaces/auth/user-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm:FormGroup =new FormGroup({});
    isBadCredentials:boolean=false;

    constructor(private formBuilder:FormBuilder,
                public  layoutService: LayoutService,
                private loginService:AuthService,
                private localStorageService:LocalStorageService,
                private router:Router,
                private titleService:Title,
                ) { }

    ngOnInit(){
        this.titleService.setTitle('Memories | Login');
        this.buildForm();
        this.localStorageService.clearSession();
    }

    loginUser(){
        this.isBadCredentials = false;
        let user : UserLogin = {
            password:this.loginForm.get('password')?.value,
            email:this.loginForm.get('email')?.value
        }

        this.loginService.loginUser(user).subscribe(res => {
            if(res.success){
                this.localStorageService.setSesionToken(res.data.access_token);
                this.localStorageService.setItem('u537',JSON.stringify({email:user.email}))
                this.router.navigate([''],{});
            }else{
                this.isBadCredentials = true;
            }
        });
    }

    buildForm(){
        this.loginForm= this.formBuilder.group({
            password : this.formBuilder.control('',[Validators.required]),
            email: this.formBuilder.control('',[Validators.required])
        });
    }
}

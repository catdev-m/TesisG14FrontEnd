import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { User } from 'src/app/interfaces/administration/user';
import { UserService } from 'src/app/services/memories/user/user.service';

@Component({
  selector: 'app-creat-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  providers:[DialogService]
})
export class CreatUserComponent {
	selectedUser:User;
	userForm: FormGroup;

	constructor(
				public ref:DynamicDialogRef,
				public config:DynamicDialogConfig,
				private userService:UserService,
				private fb : FormBuilder){}

	ngOnInit(){
		this.buildUserForm();
	}

	buildUserForm(){
		this.userForm = this.fb.group({
			usuario:['',[Validators.required,Validators.minLength(4)]],
			email:['',[Validators.required,Validators.email]],
			password:['',[Validators.required]]
		});
	}

	createUser(){
		let user:User={
			email:this.userForm.get("email")?.value,
			name:this.userForm.get("usuario")?.value,
			password:this.userForm.get("password")?.value,
		};

		this.userService.createUser(user).subscribe(res=>{
			if(res.userId){
				this.ref.close({user:res,success:true});
			}else{
				this.ref.close({success:false});
			}
		});

	}

	cancel(){
		this.ref.close();
	}
}

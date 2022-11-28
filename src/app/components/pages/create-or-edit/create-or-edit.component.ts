import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Account, createAccount, createParamSearch } from 'src/app/core/model/account.model';
import { AccountService } from 'src/app/core/services/account.service';
declare let alertify: any;

@Component({
  selector: 'app-create-or-edit',
  templateUrl: './create-or-edit.component.html',
  styleUrls: ['./create-or-edit.component.scss']
})
export class CreateOrEditComponent implements OnInit {

  submitted = false;
  respData: any;
  editData: any;
  account: Account[] = [];
  acc:any
  actionName:string = 'Create';

  constructor(
    private accountService: AccountService,
    public dialogRef: MatDialogRef<CreateOrEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }
  dataSource!: MatTableDataSource<Account>;


  ngOnInit(): void {
    
    if(this.data.accCode!==null && this.data.accCode!='') {
      this.loadEditData(this.data.accCode)
    }
  }

  ReactiveForm = new FormGroup({
    firstname:new FormControl('',
    [ 
      Validators.required,
      Validators.pattern('^[a-zA-Z]+(([a-zA-Z])?[a-zA-Z]*)*$')
    ]),

    lastname:new FormControl('',
    [ 
      Validators.required,
      Validators.pattern('^[a-zA-Z]+(([a-zA-Z])?[a-zA-Z]*)*$')
    ]),

    age:new FormControl('',
    [ 
      Validators.required,
      Validators.pattern('^(0?[1-9]|[1-9][0-9]|100)$')
    ]),
    employer:new FormControl('',Validators.required),
    balance:new FormControl('',Validators.required),
    email:new FormControl('',
    [ 
      Validators.required,
      Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')
    ]),
    gender:new FormControl('',Validators.required),
    address:new FormControl('',Validators.required),
    city:new FormControl('',Validators.required),
    state:new FormControl('',Validators.required),
  })

  get accountFormControl(){
    return this.ReactiveForm.controls;
  }

  loadEditData(code: any){   
    this.actionName = "Update";
    this.editData = code;
    this.ReactiveForm.controls['firstname'].setValue(this.editData.firstname);
    this.ReactiveForm.controls['lastname'].setValue(this.editData.lastname);
    this.ReactiveForm.controls['age'].setValue(this.editData.age);
    this.ReactiveForm.controls['employer'].setValue(this.editData.employer);
    this.ReactiveForm.controls['balance'].setValue(this.editData.balance);
    this.ReactiveForm.controls['email'].setValue(this.editData.email);
    this.ReactiveForm.controls['gender'].setValue(this.editData.gender);
    this.ReactiveForm.controls['address'].setValue(this.editData.address);
    this.ReactiveForm.controls['city'].setValue(this.editData.city);
    this.ReactiveForm.controls['state'].setValue(this.editData.state);
  }

  saveAccount() {

    const newAccount = this.ReactiveForm.getRawValue()
    // this.submitted = true;
    if(!this.editData){
      if(this.ReactiveForm.valid){
        this.accountService.addAccount(newAccount)
        .subscribe((resp) => {
            alertify.success('Save successfully !');
            this.dialogRef.close();
        });
      }else{
        alertify.error('Check valid !');
      }
    }else{
      this.updateAcc();
    }

  }

  updateAcc(){   
    console.log(this.editData._id);
     
    this.accountService.editAccount(this.ReactiveForm.value,this.editData._id).subscribe(r=>{
      alertify.success('Save successfully !');
      this.dialogRef.close();
    })
  }
  
}

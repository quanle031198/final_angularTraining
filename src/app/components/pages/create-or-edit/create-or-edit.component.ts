import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Account, createParamSearch } from 'src/app/core/model/account.model';
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
  account: Account[] = [];
  acc:any

  constructor(
    private accountService: AccountService,
    public dialogRef: MatDialogRef<CreateOrEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Account,
    ) { }
  dataSource!: MatTableDataSource<Account>;


  ngOnInit(): void {
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
      Validators.pattern('[a-z0-9]+(@gmail|@email)+\.[a-z]{2,3}')
    ]),
    gender:new FormControl('',Validators.required),
    address:new FormControl('',Validators.required),
    city:new FormControl('',Validators.required),
    state:new FormControl('',Validators.required),
  })

  get accountFormControl(){
    return this.ReactiveForm.controls;
  }

  SaveAccount() {

    const newAccount = this.ReactiveForm.getRawValue()
    // this.submitted = true;
  if(this.ReactiveForm.valid){
    this.accountService.addAccount(newAccount)
    .subscribe((resp) => {
        alertify.success('Add successfully !');
        this.dialogRef.close();
    });
  }else{
    alertify.error('Check valid !');
  }

}

}

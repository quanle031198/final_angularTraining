import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Account } from 'src/app/core/model/account.model';
import { AccountService } from 'src/app/core/services/account.service';
import { CreateOrEditComponent } from '../../pages/create-or-edit/create-or-edit.component';
import { ViewComponent } from '../../pages/view/view.component';


@Component({
  selector: 'app-my-datatable',
  templateUrl: './my-datatable.component.html',
  styleUrls: ['./my-datatable.component.scss']
})
export class MyDatatableComponent implements OnInit {

  @Input() 
  listRows:Account[] = [];

  @Input()
   listColumns = [
    {
      label: '',
      width: '100px',
    }

  ]

  @Output() deleteAccEvent = new EventEmitter<any>();

  constructor(
    private accountService: AccountService, 
    private dialog: MatDialog 
    ) { }

  ngOnInit(): void {    
  }

  FunctionView(code: any) {
    this.OpenView(code)
  }

  OpenView(code:any) {    
    this.dialog.open(ViewComponent,{
      data:{
         vidata:code
      }
    })
  }

  FunctionEdit(code: any) {
    this.OpenDialog(code)
  }

  OpenDialog(code:any) {

    this.dialog.open(CreateOrEditComponent, {
      width: "50%",
      data:{
        accCode:code
      }
    })
  }

  deleteAcc(id:any){
    this.accountService.deleteAccount(id).subscribe((res) => { 
      console.log(res);
           
          this.deleteAccEvent.emit(res);
          
    })
  }

  
}

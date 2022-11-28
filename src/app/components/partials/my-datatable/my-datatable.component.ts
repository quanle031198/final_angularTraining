import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Account } from 'src/app/core/model/account.model';
import { AccountService } from 'src/app/core/services/account.service';

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
  @Output() editAccEvent = new EventEmitter<any>();
  @Output() viewAccEvent = new EventEmitter<any>();

  constructor(
    private accountService: AccountService, 
    private dialog: MatDialog 
    ) { }

  ngOnInit(): void { 
  }


  openView(code:any) {    
    this.viewAccEvent.emit(code);
  }

  functionEdit(code: any) {
    this.editAccEvent.emit(code);
  }

  deleteAcc(id:any){
    this.deleteAccEvent.emit(id);
  }

  
}

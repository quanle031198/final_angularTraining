import {Component, OnInit, VERSION, ViewChild} from '@angular/core';
import {AccountService} from 'src/app/core/services/account.service';
import {Observable, Subject} from 'rxjs';
import {Account, createAccount, createParamSearch} from 'src/app/core/model/account.model';
import {takeUntil} from 'rxjs/operators';
import { Accounts } from 'src/app/core/data/account';
import * as faker from 'faker';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateOrEditComponent } from '../create-or-edit/create-or-edit.component';
import { ViewComponent } from '../view/view.component';
declare let alertify: any;



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;

  pagination = {
    page: 0,
    size: 25,
    total: 0
  }
  
  dataSource!: MatTableDataSource<Account>;

  account: Account[] = [];

  txtLable = [
    {
    label: 'Name',
    width: '100px'
  },
  
  {
    label: 'Balance',
    width: '140px'

  },
  {
    label: 'Age',
    width: '150px'

  },
  {
    label: 'Action',
    width: '100px'

  }

  ]

  unSubscribeAll: Subject<any>;
  isOpenAddAccount = false;
  isOpenEditAccount = false;
  selectedAccount: Account | undefined;
  searchStr = '';

  constructor(private dialog: MatDialog, private accountService: AccountService) {
    // read data from file to localstorage
    this.unSubscribeAll = new Subject<any>();
    this.loadDataToLocal();
  }

  ngOnInit(): void {
    this.getAllAccount(); 
    this.accountService.requiredRefresh.subscribe(r=>{
      this.getAllAccount()
    })
  }

  loadDataToLocal(): void {
    localStorage.setItem('accounts', JSON.stringify(Accounts));
  }


  getAllAccount(): void {
    this.accountService.getAccounts(createParamSearch({
      last_name: this.searchStr,
      // start: 0,
      // limit:25,
      start: this.pagination.page,
      limit:this.pagination.size,
    }))
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe((resp: Account[]) => {
        this.account = resp;
        this.dataSource = new MatTableDataSource(this.account);
        this.dataSource.paginator = this.paginator;
        
        this.pagination.total = this.account.length;
        
      }, (err: Error) => {
        this.account = [];
      });
      
  }

  search(): void {
    this.getAllAccount();
  }

  changePage(e: any){
    console.log(e);
    
    this.pagination.page = e.pageIndex;
    this.pagination.size = e.pageSize;
  }

  deleteAccount($e: any){
    this.accountService.deleteAccount($e).subscribe((res) => { 
      alertify.confirm("Remove Account", "Are you sure ?",()=>{
        this.getAllAccount(); 
        alertify.success('Delete successfully !'); 
      },function(){
  
      })
    })
    
  }

  editAccount($e:any){
    this.openDialog($e)
  }

  openDialog(code:any){
    this.dialog.open(CreateOrEditComponent,{
      width: "50%",
      data:{
        accCode:code
      }
    })
  }

  viewAccount($e:any) {    
    this.dialog.open(ViewComponent,{
      data:{
         vidata:$e
      }
    })
  }
}

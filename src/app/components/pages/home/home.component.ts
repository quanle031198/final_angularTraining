import {Component, OnInit, VERSION, ViewChild} from '@angular/core';
import {AccountService} from 'src/app/core/services/account.service';
import {Observable, Subject} from 'rxjs';
import {Account, createAccount, createParamSearch} from 'src/app/core/model/account.model';
import {takeUntil} from 'rxjs/operators';
import { Accounts } from 'src/app/core/data/account';
import * as faker from 'faker';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;

  pagination = {
    page: 0,
    size: 5,
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
    label: 'Age',
    width: '150px'

  },
  {
    label: 'Balance',
    width: '140px'

  },
  {
    label: 'Thao tác',
    width: '100px'

  }

  ]
  unSubscribeAll: Subject<any>;
  isOpenAddAccount = false;
  isOpenEditAccount = false;
  selectedAccount: Account | undefined;
  searchStr = '';

  constructor(private accountService: AccountService) {
    // read data from file to localstorage
    this.unSubscribeAll = new Subject<any>();
    this.loadDataToLocal();
  }

  ngOnInit(): void {
    this.getAllAccount();   
       
  }

  loadDataToLocal(): void {
    localStorage.setItem('accounts', JSON.stringify(Accounts));
  }


  getAllAccount(): void {
    this.accountService.getAccounts(createParamSearch({
      last_name: this.searchStr,
      start: 0,
      limit:800,
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

  openAddAccount(): void {
    this.isOpenAddAccount = true;
  }

  openEdit(acc: Account): void {
    this.selectedAccount = acc;
    this.isOpenEditAccount = true;
  }

  saveEdit(): void {
    const editedAccount = createAccount({
      balance: parseInt(faker.finance.amount(0, 99999), 0),
      age: 25,
      lastname: faker.name.lastName(),
      firstname: faker.name.lastName(),
      city: this.selectedAccount?.city,
      account_number: this.selectedAccount?.account_number,
      address: this.selectedAccount?.address,
      email: this.selectedAccount?.email,
      employer: this.selectedAccount?.employer,
      gender: 'F',
      state: this.selectedAccount?.state,
      _id: this.selectedAccount?._id
    });

    this.accountService.editAccount(editedAccount)
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe((resp: Account[]) => {
        this.getAllAccount();
        this.isOpenEditAccount = false;
      }, (err: Error) => {
        this.account = [];
      });
  }

  saveNew(): void {
    const newAccount = createAccount({
      balance: parseInt(faker.finance.amount(0, 99999), 0),
      age: 25,
      lastname: faker.name.lastName(),
      firstname: faker.name.lastName(),
      city: faker.address.city(),
      account_number: faker.finance.account(),
      address: faker.address.streetAddress(),
      email: faker.internet.email(),
      employer: faker.name.lastName(),
      gender: 'F',
      state: faker.address.stateAbbr()
    });

    this.accountService.addAccount(newAccount)
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe((resp: Account[]) => {
        this.getAllAccount();
        this.isOpenAddAccount = false;
      }, (err: Error) => {
        this.account = [];
      });
  }

  search(): void {
    this.getAllAccount();
  }
  changePage(e: any){
    this.pagination.page = e.pageIndex;
    this.pagination.size = e.pageSize;
  }

  deleteAccount($e: any){
    this.getAllAccount();  
  }
}

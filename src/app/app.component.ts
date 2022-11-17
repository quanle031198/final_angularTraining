import {Component, OnInit, VERSION} from '@angular/core';
import {AccountService} from './core/services/account.service';
import {Observable, Subject} from 'rxjs';
import {Account, createAccount, createParamSearch} from './core/model/account.model';
import {takeUntil} from 'rxjs/operators';
import {Accounts} from './core/data/account';
import * as faker from 'faker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 
  constructor() {
  
  }

  ngOnInit(): void {
 
  }

  
}

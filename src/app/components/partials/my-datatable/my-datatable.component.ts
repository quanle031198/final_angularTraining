import { Component, Input, OnInit } from '@angular/core';
import { Account } from 'src/app/core/model/account.model';

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
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  viewData:any;
  male:string ='';
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) {
    this.viewData = data.vidata;
    // console.log(this.viewData);
    this.viewData.gender == "M"? this.male="Male" : this.male="Female"

   }

  ngOnInit(): void {
    
  }

}

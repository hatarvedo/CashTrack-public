import { Component } from '@angular/core';

import { NgFor } from '@angular/common';

import { KiadasManagerService } from '../../../services/kiadas-manager.service';

@Component({
  selector: 'app-expenselist',
  imports: [NgFor],
  templateUrl: './expenselist.component.html',
  styleUrl: './expenselist.component.css'
})
export class ExpenselistComponent {
  kiadasKategoriak: any[]=[];
  kiadasok: any[] = []
  constructor(private kiadasService: KiadasManagerService){
    this.kiadasok = JSON.parse(localStorage.getItem('kiadasok')|| '[]' );
  }

kiadasokFelugyelet:any[] = []

  
kiadaskategoriatomb: any[] =[];
ngOnInit(): void {
  this.kiadasService.kiadasokLekeres()
  /* this.kiadasService.kiadasokKategoriaNeve(); */
  this.kiadasokFelugyelet = JSON.parse(localStorage.getItem('kiadasok')|| '[]' );
  console.log(this.kiadasokFelugyelet);
  this.kiadasService.kiadasok$.subscribe((data) => {
    this.kiadasok = data;
  }); 
}

  kiadasTorles(index: number,kiadasID: number) {
    this.kiadasService.kiadasTorles(index,kiadasID);
  }
}

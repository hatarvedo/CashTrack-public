import { Component, computed, signal, ViewChild } from '@angular/core';

import { NgFor } from '@angular/common';

import { KiadasManagerService } from '../../../services/kiadas-manager.service';
import { DashboardComponent } from '../dashboard.component';

@Component({
  selector: 'app-expenselist',
  imports: [NgFor],
  templateUrl: './expenselist.component.html',
  styleUrl: './expenselist.component.css'
})
export class ExpenselistComponent {

  kiadasok: any[] = []
  constructor(private kiadasService: KiadasManagerService){
    this.kiadasok = JSON.parse(localStorage.getItem('kiadasok')|| '[]' );
  }

kiadasokFelugyelet:any[] = []

kiadasSignal: any;
kiadaskategoriatomb: any[] =[];
ngOnInit(): void {
  this.kiadasService.kiadasokLekeres()
  setTimeout(() => {
    
    this.kiadasok = JSON.parse(localStorage.getItem('kiadasok')|| '[]' );
    console.log("kiadasJSON", this.kiadasok)
  }, 1000);
  
}
  @ViewChild(DashboardComponent) dashboard: DashboardComponent | undefined;
  kiadasTorles(index: number,kiadasID: number) {
    this.kiadasService.kiadasTorles(index,kiadasID);
    setTimeout(() => {
      
      this.kiadasService.kiadasokLekeres();
      this.ngOnInit();
      this.kiadasok = JSON.parse(localStorage.getItem('kiadasok')|| '[]' );
      
    }, 500);
    
  }
}

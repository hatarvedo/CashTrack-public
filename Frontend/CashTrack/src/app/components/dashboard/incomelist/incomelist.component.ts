import { NgFor } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { JovedelemManagerService } from '../../../services/jovedelem-manager.service';
import { DashboardComponent } from '../dashboard.component';

@Component({
  selector: 'app-incomelist',
  imports: [NgFor],
  templateUrl: './incomelist.component.html',
  styleUrl: './incomelist.component.css'
})


export class IncomelistComponent {
  jovedelmek: any[] = [];
  jovedelemekFelugyelet: any[] = [];


  constructor(private jovedelemService: JovedelemManagerService)
  {
    this.jovedelmek = JSON.parse(localStorage.getItem('jovedelmek')|| '[]' );
  }
   
  ngOnInit(): void {
    console.log('IncomelistComponent initialized');
    
    this.jovedelemService.jovedelemLekeres();
    this.jovedelemekFelugyelet = JSON.parse(localStorage.getItem('jovedelmek')|| '[]' );
  
    console.log(this.jovedelemekFelugyelet);
    this.jovedelmek =JSON.parse(localStorage.getItem('jovedelmek')|| '[]' );
    console.log("jovedelemJSON", this.jovedelmek)
   
  }
  @ViewChild(DashboardComponent) dashboard: DashboardComponent | undefined;
  jovedelemTorles(index: number, jovedelemID: number) {
    this.jovedelemService.jovedelemTorles(index,jovedelemID);
    setTimeout(() => {
      this.ngOnInit();
      this.dashboard?.ngOnInit();
      this.jovedelemService.jovedelemLekeres();
      
    }, 2000);
    
    


  }

}

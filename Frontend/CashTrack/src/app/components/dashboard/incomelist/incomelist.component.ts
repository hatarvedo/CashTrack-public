import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { JovedelemManagerService } from '../../../services/jovedelem-manager.service';

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
   
  ngOnInIt(): void {
    console.log('IncomelistComponent initialized');
    
    this.jovedelemService.jovedelemLekeres();
    this.jovedelemekFelugyelet = JSON.parse(localStorage.getItem('jovedelmek')|| '[]' );
    console.log(this.jovedelemekFelugyelet);
   this.jovedelmek= this.jovedelemService.jovedelemLekeresJSON();
  }
  jovedelemTorles(index: number, jovedelemID: number) {
    this.jovedelemService.jovedelemTorles(index,jovedelemID);
  }

}

import { Component, computed, inject, Signal, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartComponent, ChartConfiguration, ChartOptions } from 'chart.js';
import { JovedelemManagerService } from '../../services/jovedelem-manager.service';

@Component({
  selector: 'app-piechart',
  imports: [BaseChartDirective],
  templateUrl: './piechart.component.html',
  styleUrl: './piechart.component.css'
})
export class PiechartComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  constructor() {
    this.jovedelemtomb();
  }
  jovedelemService = inject(JovedelemManagerService);
  jovedelemtomb: Signal<any[]> = computed(() => this.jovedelemService.jovedelemAdat());
    
 
 // Pie
 public pieChartOptions: ChartOptions<'pie'> = {
  plugins: {
    title: {
      text: 'Bevételek kategóriák szerint',
      display: true,
      color: 'white',
      font: {
        size: 20,
        weight: 'bold',
        family: 'Arial',
        lineHeight: 1.2,
        
      }
    }
  },
  responsive: true,
};
public pieChartLabels: string[] = this.jovedelemtomb().map((jovedelem:any) => jovedelem.kategoria?.jovedelemKategoria || '[]');
public pieChartDatasets = [ {
  data: this.jovedelemtomb().map((jovedelem:any) => jovedelem.bevetelHUF || 0),
  backgroundColor: [
    'rgba(0, 50, 0, 1)',
    'rgba(0, 75, 0, 1)',
    'rgba(0, 100, 0, 1)',
    'rgba(0, 125, 0, 1)',
    'rgba(0, 150, 0, 1)',
    'rgba(0, 175, 0, 1)',
    'rgba(0, 200, 0, 1)',
    'rgba(0, 225, 0, 1)',
    'rgba(25, 255, 25, 1)',
    'rgba(50, 255, 50, 1)',
    'rgba(75, 255, 75, 1)',
    'rgba(100, 255, 100, 1)',
    'rgba(125, 255, 125, 1)',
    'rgba(150, 255, 150, 1)',
    'rgba(175, 255, 175, 1)',
    'rgba(200, 255, 200, 1)'
    ],
    borderColor: [
      'rgba(0, 50, 0, 1)',
    'rgba(0, 75, 0, 1)',
    'rgba(0, 100, 0, 1)',
    'rgba(0, 125, 0, 1)',
    'rgba(0, 150, 0, 1)',
    'rgba(0, 175, 0, 1)',
    'rgba(0, 200, 0, 1)',
    'rgba(0, 225, 0, 1)',
    'rgba(25, 255, 25, 1)',
    'rgba(50, 255, 50, 1)',
    'rgba(75, 255, 75, 1)',
    'rgba(100, 255, 100, 1)',
    'rgba(125, 255, 125, 1)',
    'rgba(150, 255, 150, 1)',
    'rgba(175, 255, 175, 1)',
    'rgba(200, 255, 200, 1)'
    ],
    borderWidth: 2
  
} ];
public pieChartLegend = true;

public pieChartPlugins = [];

ngAfterViewInit() {
  setTimeout(() => {
    this.jovedelemService.jovedelemVizsgalatLekereseJSON();
    this.jovedelemtomb();
    console.log('apam ngoninit',this.jovedelemtomb());
    this.refreshChart();
  },2000);
}

refreshChart() {
  setTimeout(() => {
    
  
  const jovedelmek= this.jovedelemtomb();
  console.log('refreshChart metodus',this.jovedelemtomb());

  // Ha még nincsenek adatok, ne csináljunk semmit
  if (!jovedelmek || jovedelmek.length === 0) {
    console.log("Nincsenek adatok a charthoz.");
    return;
  }

  // Kategória darabszámok összesítése
  const categoryCounts: { [key: string]: number } = {};
  jovedelmek.forEach(jovedelem => {
    if (jovedelem.kategoria && jovedelem.kategoria.jovedelemKategoria) {
      const osszeg = jovedelem.kategoria.jovedelemKategoria;
      categoryCounts[osszeg] = (categoryCounts[osszeg] || 0) + jovedelem.bevetelHUF;
    }
  });

  // Ha nincs érvényes adat, ne frissítsünk
  if (Object.keys(categoryCounts).length === 0) {
    console.warn("Nem található érvényes kategória a chart frissítéséhez.");
    return;
  }

  // Frissítjük a chart adatait
  this.pieChartLabels = Object.keys(categoryCounts);
  this.pieChartDatasets[0].data = Object.values(categoryCounts);

  // Ha a chart még nem jött létre, ne próbáljuk frissíteni
  if (!this.chart) {
    console.warn("A chart még nem inicializálódott.");
    return;
  }

  this.chart.update(); // Frissítés
}, 2000);
}

}

import { Component, computed, inject, signal, Signal, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { KiadasManagerService } from '../../../services/kiadas-manager.service';


@Component({
  selector: 'app-polararea',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './polararea.component.html',
  styleUrl: './polararea.component.css'
})
export class PolarareaComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  
     constructor() {
      this.kiadasoktomb(); // Ezzel biztosítjuk, hogy figyeljük a változásokat
    
    }
    

kiadasService = inject(KiadasManagerService);
kiadasoktomb: Signal<any[]> = computed(() => this.kiadasService.kiadasAdat());

 
  
kiadaskategoriatomb= JSON.parse(localStorage.getItem('kiadaskategoriak') || '[]');
 
// PolarArea
public polarAreaChartLabels = this.kiadasoktomb().map((k: any) => k.kategoria?.kiadasKategoria || '[]');
public polarAreaChartDatasets: ChartConfiguration<'polarArea'>['data']['datasets'] = [

  { data: this.kiadasoktomb().map((k: any) => k.kiadasHUF || 0),
    backgroundColor: [
    'rgba(50, 0, 0, 1)',
    'rgba(75, 0, 0, 1)',
    'rgba(100, 0, 0, 1)',
    'rgba(125, 0, 0, 1)',
    'rgba(150, 0, 0, 1)',
    'rgba(175, 0, 0, 1)',
    'rgba(200, 0, 0, 1)',
    'rgba(225, 0, 0, 1)',
    'rgba(255, 25, 25, 1)',
    'rgba(255, 50, 50, 1)',
    'rgba(255, 75, 75, 1)',
    'rgba(255, 100, 100, 1)',
    'rgba(255, 125, 125, 1)',
    'rgba(255, 150, 150, 1)',
    'rgba(255, 175, 175, 1)',
    'rgba(255, 200, 200, 1)'
    ],
    borderColor: [
      'rgba(50, 0, 0, 1)',
    'rgba(75, 0, 0, 1)',
    'rgba(100, 0, 0, 1)',
    'rgba(125, 0, 0, 1)',
    'rgba(150, 0, 0, 1)',
    'rgba(175, 0, 0, 1)',
    'rgba(200, 0, 0, 1)',
    'rgba(225, 0, 0, 1)',
    'rgba(255, 25, 25, 1)',
    'rgba(255, 50, 50, 1)',
    'rgba(255, 75, 75, 1)',
    'rgba(255, 100, 100, 1)',
    'rgba(255, 125, 125, 1)',
    'rgba(255, 150, 150, 1)',
    'rgba(255, 175, 175, 1)',
    'rgba(255, 200, 200, 1)'
    ],
    
    borderWidth: 2
    
   }
];

public polarAreaLegend = true;

public polarAreaOptions: ChartConfiguration<'polarArea'>['options'] = {

  responsive: true,
  plugins: {
    title: {
      text: 'Kiadások kategóriák szerint',
      display: true,
      color: 'white',
      font: {
        size: 20,
        weight: 'bold',
        family: 'Arial',
        lineHeight: 1.2
      }
    }
  },
  scales: {
    r: {
      ticks: {
        display: false // Eltünteti a skálaértékeket
      },
    }
  }
 
}

ngAfterViewInit(){
  setTimeout(() => {
    this.kiadasService.kiadasokReturn();
    this.kiadasoktomb();
    console.log('anyam ngoninit',this.kiadasoktomb());
    this.refreshChart();
  }, 2000);
  
  
}

refreshChart() {
  setTimeout(() => {
    
  
  const kiadasok = this.kiadasoktomb();
  console.log('refreshChart metodus',this.kiadasoktomb());

  // Ha még nincsenek adatok, ne csináljunk semmit
  if (!kiadasok || kiadasok.length === 0) {
    console.log("Nincsenek adatok a charthoz.");
    return;
  }

  // Kategória darabszámok összesítése
  const categoryCounts: { [key: string]: number } = {};
  kiadasok.forEach(kiadas => {
    if (kiadas.kategoria && kiadas.kategoria.kiadasKategoria) {
      const category = kiadas.kategoria.kiadasKategoria;
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    }
  });

  // Ha nincs érvényes adat, ne frissítsünk
  if (Object.keys(categoryCounts).length === 0) {
    console.warn("Nem található érvényes kategória a chart frissítéséhez.");
    return;
  }

  // Frissítjük a chart adatait
  this.polarAreaChartLabels = Object.keys(categoryCounts);
  this.polarAreaChartDatasets[0].data = Object.values(categoryCounts);

  // Ha a chart még nem jött létre, ne próbáljuk frissíteni
  if (!this.chart) {
    console.warn("A chart még nem inicializálódott.");
    return;
  }

  this.chart.update(); // Frissítés
}, 2000);
}

}







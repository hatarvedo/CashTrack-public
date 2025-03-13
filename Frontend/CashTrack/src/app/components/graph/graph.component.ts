import { Component, computed, OnInit, Signal, signal, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { KiadasManagerService } from '../../services/kiadas-manager.service';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent implements OnInit  {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  constructor(private kiadasService: KiadasManagerService) {
    /* this.kiadasadatok = signal(this.kiadasService.kiadastomb); */
    this.kiadastomb();
  }
  kiadastomb: Signal<any[]> = computed(() => this.kiadasService.kiadasAdat());
/*   kiadasadatok: any[] = JSON.parse(localStorage.getItem('kiadasok') || '[]'); */
  
 /*  kiadasadatok: any; */
  
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Initialize with zeros for all months
        label: 'Kiadások',
        fill: true,
        tension: 0.5,
        backgroundColor: 'rgba(0, 128, 0, 0.2)', // Átlátszó zöld háttér
        borderColor: 'green',
        borderWidth: 2
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Halvány rácsvonalak
          display:false
        },
        ticks: {
          color: 'white', // Fehér számok az Y tengelyen
          callback: function(value) {
            return value.toLocaleString('hu-HU') + ' Ft';
          },
          maxTicksLimit: 6
        },
        suggestedMin: 0,
        suggestedMax: 50000
      },
      x: {
        grid: {
          display: false // X tengely rácsvonalainak elrejtése a minimalista megjelenésért
        },
        ticks: {
          color: 'white' // Fehér hónapnevek az X tengelyen
        }
      }
    },
    plugins: {
      legend: {
        display: false // Jelmagyarázat elrejtése a minimalista megjelenésért
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toLocaleString('hu-HU') + ' Ft';
            }
            return label;
          }
        }
      }
    },
    elements: {
      line: {
        borderWidth: 2 // Vastagabb vonal
      },
      point: {
        radius: 3, // Kisebb pontok
        hoverRadius: 5 // Hover esetén nagyobb pontok
      }
    }
  };

  public lineChartLegend = false; // Jelmagyarázat kikapcsolva a minimalista megjelenésért

  

  ngOnInit(): void {
    
    setTimeout(() => {
      this.kiadasService.kiadasokReturn();
      this.kiadastomb();
      console.log('kiadasadatok',this.kiadastomb());
      this.processExpenseData();
    
    }, 2000);
  }

  processExpenseData(): void {
    setTimeout(() => {
      
   
    const kiadasadatok = this.kiadastomb();
    console.log('kiadasadatok processexpense',kiadasadatok);
    if (!kiadasadatok || kiadasadatok.length === 0) {
      return;
    }

    // Initialize monthly totals array with zeros
    const monthlyTotals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // Group expenses by month
    kiadasadatok.forEach((kiadas: any) => {
      if (kiadas.kiadasDatum) {
        const date = new Date(kiadas.kiadasDatum);
        const month = date.getMonth(); // 0-11 for Jan-Dec
        
        // Add the expense amount to the corresponding month
        if (kiadas.kiadasHUF) {
          const amount = parseFloat(kiadas.kiadasHUF);
          if (!isNaN(amount)) {
            monthlyTotals[month] += amount;
          }
        }
      }
    });

    // Update chart data with monthly totals
    this.lineChartData.datasets[0].data = monthlyTotals;
    
    // Dynamically adjust the Y-axis max value based on the data
    const maxValue = Math.max(...monthlyTotals);
    if (maxValue > 0) {
      // Round up to a nice number for the max value
      const roundedMax = Math.ceil(maxValue / 10000) * 10000;
      
      if (this.lineChartOptions.scales && this.lineChartOptions.scales['y']) {
        this.lineChartOptions.scales['y'].suggestedMax = roundedMax;
        
        // Adjust tick settings based on the max value
        if (this.lineChartOptions.scales['y'].ticks) {
          if (roundedMax <= 50000) {
            // For smaller values, use smaller steps
            this.lineChartOptions.scales['y'].ticks.maxTicksLimit = 10;
          } else if (roundedMax <= 100000) {
            // For medium values
            this.lineChartOptions.scales['y'].ticks.maxTicksLimit = 10;
          } else {
            // For larger values
            this.lineChartOptions.scales['y'].ticks.maxTicksLimit = 8;
          }
        }
      }
    }
    this.chart?.update();
  }, 2000);
  }
  
}
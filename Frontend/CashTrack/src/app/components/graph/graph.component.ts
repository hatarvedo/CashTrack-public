import { Component, computed, OnInit, Signal, signal, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { KiadasManagerService } from '../../services/kiadas-manager.service';
import { JovedelemManagerService } from '../../services/jovedelem-manager.service';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent implements OnInit  {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  constructor(
    private kiadasService: KiadasManagerService,
    private jovedelemService: JovedelemManagerService
  ) {
    /* this.kiadasadatok = signal(this.kiadasService.kiadastomb); */
    this.kiadastomb();
    this.jovedelmtomb();
  }
  kiadastomb: Signal<any[]> = computed(() => this.kiadasService.kiadasAdat());
  jovedelmtomb: Signal<any[]> = computed(() => this.jovedelemService.jovedelemAdat());
/*   kiadasadatok: any[] = JSON.parse(localStorage.getItem('kiadasok') || '[]'); */
  
 /*  kiadasadatok: any; */
  
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        label: 'Kiadások',
        fill: true,
        tension: 0.5,
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        borderColor: 'red',
        borderWidth: 2
      },
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        label: 'Jövedelmek',
        fill: true,
        tension: 0.5,
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
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
          color: 'rgba(255, 255, 255, 0.1)',
          display: false
        },
        ticks: {
          color: 'white',
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
          display: false
        },
        ticks: {
          color: 'white'
        }
      }
    },
    plugins: {
      title: {
        text: 'Kiadások és Jövedelmek',
        display: true,
        color: 'white',
        font: {
          size: 20,
          weight: 'bold',
          family: 'Arial',
          lineHeight: 1.2,
        }
      },
      legend: {
        display: true,
        labels: {
          color: 'white'
        }
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
        borderWidth: 2
      },
      point: {
        radius: 3,
        hoverRadius: 5
      }
    }
  };

  public lineChartLegend = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.kiadasService.kiadasokReturn();
      this.jovedelemService.jovedelemLekeres();
      this.kiadastomb();
      this.jovedelmtomb();
      console.log('kiadasadatok', this.kiadastomb());
      console.log('jovedelmadatok', this.jovedelmtomb());
      this.processData();
    }, 2000);
  }

  processData(): void {
    setTimeout(() => {
      const kiadasadatok = this.kiadastomb();
      const jovedelmadatok = this.jovedelmtomb();
      
      if (!kiadasadatok || !jovedelmadatok) {
        return;
      }

      // Initialize monthly totals arrays with zeros
      const monthlyExpenseTotals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const monthlyIncomeTotals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      // Process expenses
      kiadasadatok.forEach((kiadas: any) => {
        if (kiadas.kiadasDatum) {
          const date = new Date(kiadas.kiadasDatum);
          const month = date.getMonth();
          if (kiadas.kiadasHUF) {
            const amount = parseFloat(kiadas.kiadasHUF);
            if (!isNaN(amount)) {
              monthlyExpenseTotals[month] += amount;
            }
          }
        }
      });

      // Process income
      jovedelmadatok.forEach((jovedelem: any) => {
        if (jovedelem.bevetelDatum) {
          const date = new Date(jovedelem.bevetelDatum);
          const month = date.getMonth();
          if (jovedelem.bevetelHUF) {
            const amount = parseFloat(jovedelem.bevetelHUF);
            if (!isNaN(amount)) {
              monthlyIncomeTotals[month] += amount;
            }
          }
        }
      });

      // Update chart data
      this.lineChartData.datasets[0].data = monthlyExpenseTotals;
      this.lineChartData.datasets[1].data = monthlyIncomeTotals;
      
      // Find the maximum value between both datasets
      const maxExpense = Math.max(...monthlyExpenseTotals);
      const maxIncome = Math.max(...monthlyIncomeTotals);
      const maxValue = Math.max(maxExpense, maxIncome);

      if (maxValue > 0) {
        const roundedMax = Math.ceil(maxValue / 10000) * 10000;
        
        if (this.lineChartOptions.scales && this.lineChartOptions.scales['y']) {
          this.lineChartOptions.scales['y'].suggestedMax = roundedMax;
          
          if (this.lineChartOptions.scales['y'].ticks) {
            if (roundedMax <= 50000) {
              this.lineChartOptions.scales['y'].ticks.maxTicksLimit = 10;
            } else if (roundedMax <= 100000) {
              this.lineChartOptions.scales['y'].ticks.maxTicksLimit = 10;
            } else {
              this.lineChartOptions.scales['y'].ticks.maxTicksLimit = 8;
            }
          }
        }
      }
      this.chart?.update();
    }, 2000);
  }
}
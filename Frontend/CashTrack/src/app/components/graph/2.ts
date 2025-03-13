import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent implements OnInit {
  public chart: any;
  public currentYear: number = new Date().getFullYear();
  private yearlyData: Map<number, number[]> = new Map();

  kiadasadatok: any[] = JSON.parse(localStorage.getItem('kiadasok') || '[]');

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
          color: 'rgba(255, 255, 255, 0.1)' // Halvány rácsvonalak
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

  constructor() {}

  ngOnInit(): void {
    this.processExpenseData();
    
    // Inicializáljuk az összes évet, amire szükség lehet
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 5; year <= currentYear + 1; year++) {
      if (!this.yearlyData.has(year)) {
        this.yearlyData.set(year, Array(12).fill(0));
      }
    }
    
    // Tesztadatok hozzáadása a 2024-es évhez, ha nincs adat
    if (!this.hasRealDataForYear(2024)) {
      this.addTestDataForYear(2024);
    }
    
    this.updateChartForYear(this.currentYear);
  }

  // Tesztadatok hozzáadása egy adott évhez
  addTestDataForYear(year: number): void {
    const testData = Array(12).fill(0).map(() => Math.floor(Math.random() * 50000));
    this.yearlyData.set(year, testData);
  }

  // Ellenőrzi, hogy van-e valódi adat egy adott évhez
  hasRealDataForYear(year: number): boolean {
    if (!this.yearlyData.has(year)) {
      return false;
    }
    
    const yearData = this.yearlyData.get(year)!;
    return yearData.some(value => value > 0);
  }

  processExpenseData(): void {
    if (!this.kiadasadatok || this.kiadasadatok.length === 0) {
      // Ha nincs adat, hozzunk létre néhány tesztadatot
      this.createTestData();
      return;
    }

    // Process data for all years
    this.kiadasadatok.forEach((kiadas: any) => {
      if (kiadas.kiadasDatum) {
        const date = new Date(kiadas.kiadasDatum);
        const year = date.getFullYear();
        const month = date.getMonth(); // 0-11 for Jan-Dec
        
        // Initialize year data if not exists
        if (!this.yearlyData.has(year)) {
          this.yearlyData.set(year, Array(12).fill(0));
        }
        
        // Add the expense amount to the corresponding month and year
        if (kiadas.kiadasHUF) {
          const amount = parseFloat(kiadas.kiadasHUF);
          if (!isNaN(amount)) {
            const yearData = this.yearlyData.get(year)!;
            yearData[month] += amount;
          }
        }
      }
    });
  }

  // Tesztadatok létrehozása, ha nincs valódi adat
  createTestData(): void {
    const currentYear = new Date().getFullYear();
    
    // Előző év
    const lastYear = currentYear - 1;
    const lastYearData = Array(12).fill(0).map(() => Math.floor(Math.random() * 40000) + 10000);
    this.yearlyData.set(lastYear, lastYearData);
    
    // Aktuális év
    const currentYearData = Array(12).fill(0).map(() => Math.floor(Math.random() * 50000) + 15000);
    // Csak az eltelt hónapokra állítsunk be adatot
    const currentMonth = new Date().getMonth();
    for (let i = currentMonth + 1; i < 12; i++) {
      currentYearData[i] = 0;
    }
    this.yearlyData.set(currentYear, currentYearData);
    
    // 2024-es év (ha nem az aktuális)
    if (currentYear !== 2024) {
      const data2024 = Array(12).fill(0).map(() => Math.floor(Math.random() * 45000) + 12000);
      this.yearlyData.set(2024, data2024);
    }
  }

  updateChartForYear(year: number): void {
    // Get data for the selected year or use zeros if no data
    const yearData = this.yearlyData.get(year) || Array(12).fill(0);
    
    // Update chart data
    this.lineChartData.datasets[0].data = [...yearData]; // Használjunk másolatot, hogy biztosan frissüljön
    
    // Update chart title to include the year
    this.lineChartData.datasets[0].label = `Kiadások (${year})`;
    
    // Dynamically adjust the Y-axis max value based on the data
    const maxValue = Math.max(...yearData);
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
  }

  changeYear(year: number): void {
    this.currentYear = year;
    this.updateChartForYear(year);
  }

  hasDataForYear(year: number): boolean {
    // Mindig engedjük a 2024-es évet és az aktuális évet
    if (year === 2024 || year === new Date().getFullYear()) {
      return true;
    }
    
    // Check if we have any data for this year
    if (!this.yearlyData.has(year)) {
      return false;
    }
    
    // Check if there's at least one month with non-zero data
    const yearData = this.yearlyData.get(year)!;
    return yearData.some(value => value > 0);
  }
}
import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-piechart',
  imports: [BaseChartDirective],
  templateUrl: './piechart.component.html',
  styleUrl: './piechart.component.css'
})
export class PiechartComponent {
 // Pie
 public pieChartOptions: ChartOptions<'pie'> = {
  responsive: false,
};
public pieChartLabels = [ [ 'Download', 'Sales' ], [ 'In', 'Store', 'Sales' ], 'Mail Sales' ];
public pieChartDatasets = [ {
  data: [ 300, 500, 100 ]
} ];
public pieChartLegend = true;
public pieChartPlugins = [];

constructor() {
}
}

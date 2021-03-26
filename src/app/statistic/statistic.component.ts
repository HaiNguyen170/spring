import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [['I.T'], ['Science'], ['Business'],['Architecture'],['Social'], 'Music & Art'];
  public pieChartData: number[] = [29, 12.9, 19.3, 9.6, 12.9, 16.1];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(238, 140, 28, 0.637)', 'rgba(238, 224, 28, 0.808)', 'rgba(28, 102, 238, 0.637)'],
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  // Pie Chart
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }



  removeSlice(): void {
    this.pieChartLabels.pop();
    this.pieChartData.pop();
    this.pieChartColors[0].backgroundColor.pop();
  }

  changeLegendPosition(): void {
    this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
  }


  //Bar chart
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartLabels: Label[] = ['Number of Contributions'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [450], label: 'I.T' },
    { data: [200], label: 'Science' },
    { data: [300], label: 'Business' },
    { data: [150], label: 'Architecture' },
    { data: [200], label: 'Social' },
    { data: [250], label: 'Music & Art' },
    { data: [0], label: ''}
  ];

  public lineview(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }
} 
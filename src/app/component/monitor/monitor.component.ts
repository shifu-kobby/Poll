import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {
  value = 'Clear me';
  constructor() {}

  ngOnInit(): void {
  }
  search() {
    console.log(this.value);
  }
  chartType = 'pie';
  chartTypeBar = 'bar';

  chartDatasets = [
    { data: [300, 50, 100, 40, 120], label: 'My First dataset' }
  ];

  chartLabels = ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'];

  chartColors = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];

  chartOptions: any = {
    responsive: true
  };

  chartClicked(event: any): void {
    console.log(event);
  }

  chartHovered(event: any): void {
    console.log(event);
  }

}

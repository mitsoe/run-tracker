import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { sept22 } from './sept22';
import { createTempo } from './utils/tempo';
import { format } from 'date-fns'
import { GraphSettings } from './models/graph-settings';

Chart.register(...registerables);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'run-tracker';
  ngOnInit() {
    const lastRuns = [
      ...sept22
    ].slice(-20);

    const labels = lastRuns.map(run => format(run.date, 'dd-MM'));

    this.createGraph(
      'distance',
      'Distance',
      lastRuns.map(run => run.distance),
      labels,
      { min: 1, type: 'bar' }
    )

    this.createGraph(
      'tempo',
      'Tempo',
      lastRuns.map(createTempo),
      labels,
      { min: 4, max: 9 }
    )

    this.createGraph(
      'heartbeat',
      'Heartbeat',
      lastRuns.map(run => run.heartbeat),
      labels,
      { min: 120, max: 180 }
    )
  }

  private createGraph(elementId: string, label: string, dataSet: any[], labels: string[], settings?: GraphSettings) {
    const data = {
      labels: labels,
      datasets: [{
        label,
        data: dataSet,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)'
        ],
        borderWidth: 1
      }]
    };

    const config = {
      type: (settings?.type ?? 'line') as ChartType,
      data: data,
      options: {
        scales: {
          y: {
            suggestedMax: settings?.max ?? 0,
            suggestedMin: settings?.min ?? 0
          }
        }
      },
    };

    const ctx = document.getElementById(elementId) as HTMLCanvasElement;
    new Chart(ctx, config)
  }
}

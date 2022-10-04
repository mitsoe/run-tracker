import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { sept22 } from './sept22';
import { createTempo } from './utils/tempo';
import { format } from 'date-fns'
import { GraphSettings } from './models/graph-settings';
import { Run, RunWithTempo } from './models/run';
import { oct22 } from './oct22';

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
      ...sept22,
      ...oct22
    ].map<RunWithTempo>((run) => {
      return {
        ...run,
        tempo: createTempo(run)
      }
    }).slice(-20);

    this.createGraph(
      'distance',
      'Distance',
      lastRuns,
      { min: 1, type: 'bar' }
    )

    this.createGraph(
      'tempo',
      'Tempo',
      lastRuns,
      { min: 5, max: 7 }
    )

    this.createGraph(
      'heartbeat',
      'Heartbeat',
      lastRuns,
      { min: 150, max: 165 }
    )
  }

  private createGraph(elementId: keyof RunWithTempo, label: string, dataSet: RunWithTempo[], settings?: GraphSettings) {
    const data = dataSet.map((run) => {
      return {
        y: run[elementId],
        x: format(run.date, 'dd-MM'),
        heartbeat: run.heartbeat
      }
    })

    const graphSetup = {
      datasets: [{
        label,
        data,
        backgroundColor: (context: any) => {
          return context.raw?.heartbeat < 165 ? '#39CCCC' : '#FF4136';
        },
        pointBackgroundColor: (context: any) => {
          return context.raw?.heartbeat < 165 ? '#39CCCC' : '#FF4136';
        },
        borderWidth: 1
      }]
    };

    const config = {
      type: (settings?.type ?? 'line') as ChartType,
      data: graphSetup,
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

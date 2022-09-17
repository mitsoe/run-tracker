import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { tempData } from './data';
import { createTempo } from './utils/tempo';
import { runToTime } from './utils/time';
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
    const distances = tempData.map(run => run.distance);
    const heartBeats = tempData.map(run => run.heartBeat);
    const tempos = tempData.map(run => {
      return createTempo(runToTime(run), run.distance);
    })

    const dates = tempData.map(run => run.date.toLocaleDateString())

    this.createDistanceChart(distances, dates);
    this.createTempoChart(tempos, dates);
    this.createHeartBeatChart(heartBeats, dates);
  }


  private createDistanceChart(distances: number[], dates: string[]) {
    const data = {
      labels: dates,
      datasets: [{
        label: 'Distances',
        data: distances,
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
      type: 'line' as ChartType,
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    };

    const ctx = document.getElementById('distance') as HTMLCanvasElement;
    new Chart(ctx, config)
  }

  private createTempoChart(tempos: number[], dates: string[]) {
    const data = {
      labels: dates,
      datasets: [{
        label: 'Tempos',
        data: tempos,
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
      type: 'line' as ChartType,
      data: data,
      options: {
        scales: {
          y: {
            suggestedMax: 10,
            suggestedMin: 4
          }
        }
      },
    } as ChartConfiguration;

    const ctx = document.getElementById('tempo') as HTMLCanvasElement;
    new Chart(ctx, config)
  }

  private createHeartBeatChart(heartBeats: number[], dates: string[]) {
    const data = {
      labels: dates,
      datasets: [{
        label: 'Heartbeats',
        data: heartBeats,
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
      type: 'line' as ChartType,
      data: data,
      options: {
        scales: {
          y: {
            suggestedMax: 180,
            suggestedMin: 120
          }
        }
      },
    };

    const ctx = document.getElementById('heartBeat') as HTMLCanvasElement;
    new Chart(ctx, config)
  }
}

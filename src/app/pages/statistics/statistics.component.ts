import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ActivatedRoute } from '@angular/router';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { StatisticsSidebarComponent } from '../statistics-sidebar/statistics-sidebar.component';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    BaseChartDirective,
    StatisticsSidebarComponent,
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent {
  formStatistics: any;
  formId: string | any;
  userToken: string | any;
  
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.formId = params.get('formId');
      if (this.formId) {
        this.loadFormDetails();
      }
    });

    this.userToken = localStorage.getItem('token');
  }

  async loadFormDetails() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      auth: this.userToken,
      'form-id': this.formId,
    });

    return this.http
      .get<any>('http://141.147.42.101/form/get_form_submissions', { headers })
      .toPromise()
      .then((data) => {
        const organizedData: { [key: string]: number } = {};

        for (const option in data) {
          if (data.hasOwnProperty(option)) {
            organizedData[option] = data[option];
          }
        }

        this.formStatistics = organizedData;
        console.log(this.formStatistics);

        return this.formStatistics;
      })
      .catch((error) => {
        console.error('Error loading form details:', error);
        throw error;
      });
  }

  getObjectKeys(obj: any): string[] {
    if (obj) {
      return Object.keys(obj);
    } else {
      return [];
    }
  }

  getTotalVotes(): number {
    let total = 0;

    for (const option of this.getObjectKeys(this.formStatistics)) {
      total += this.formStatistics[option];
    }
    return total;
  }

  getMaxVotes(): number {
    let maxVotes = 0;
    for (const option of this.getObjectKeys(this.formStatistics)) {
      if (this.formStatistics[option] > maxVotes) {
        maxVotes = this.formStatistics[option];
      }
    }
    return maxVotes;
  }
}

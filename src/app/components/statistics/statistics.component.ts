import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ActivatedRoute } from '@angular/router';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, HttpClientModule, BaseChartDirective],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent {
  formStatistics: any;
  formId: string | any;
  userToken: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiWGxYd2k3Uk9ZTzg0UGU2bmdnNVgiLCJleHAiOjE3MTM4OTc3Mjd9.vH-lV3ak91mzOE7VLDVDFoNlBIg4xkIrnbLM23vb4Wc';

  fakeData: { [key: string]: number } = {
    alma: 55,
    korte: 2,
    banan: 10,
    pityoka: 3,
    eper: 3,
    kenyer: 5,
    kokusz: 7.5,
  };

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((params) => {
      this.formId = params.get('formId');
      console.log(this.formId);
    });

    await this.loadFormDetails();
  }

  async loadFormDetails() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      auth: this.userToken,
      'form-id': this.formId,
    });

    return this.http
      .get<any>('http://141.147.42.101/form/get_form_submissions', {
        headers,
      })
      .toPromise()
      .then((data) => {
        this.formStatistics = data;

        console.log(data);

        return this.formStatistics;
      })
      .catch((error) => {
        console.error('Error loading form details:', error);
        throw error;
      });
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  getTotalVotes(): number {
    let total = 0;
    for (const option of this.getObjectKeys(this.fakeData)) {
      total += this.fakeData[option];
    }
    return total;
  }

  getMaxVotes(): number {
    let maxVotes = 0;
    for (const option of this.getObjectKeys(this.fakeData)) {
      if (this.fakeData[option] > maxVotes) {
        maxVotes = this.fakeData[option];
      }
    }
    return maxVotes;
  }
}

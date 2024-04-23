import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent {
  formStatistics: any;

  formId: string | any;
  userToken: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMXI0N1U4Uzd6UHNCb3ZqYW4xcmwiLCJleHAiOjE3MTMyNzMwMDR9.dBEn5NzgcVSD2XJJ3HknQnZqTlv9kLNP05dl5oZsnYY';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((params) => {
      this.formId = params.get('formId');
    });

    await this.loadFormDetails();
  }

  async loadFormDetails() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth': this.userToken,
      'form-id': this.formId,
    });

    return this.http
      .get<any>('http://141.147.42.101:3001/form/get_form_submissions', {
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


}

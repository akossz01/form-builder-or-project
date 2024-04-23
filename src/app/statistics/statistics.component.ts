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
  imports: [CommonModule, HttpClientModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent {
  formStatistics: any;

  formId: string | any;
  userToken: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiWGxYd2k3Uk9ZTzg0UGU2bmdnNVgiLCJleHAiOjE3MTM4Nzg0MTV9.3UrMClnZFtzqfs_Wwk8OHBgXwm8d4_r-EoS3tb38Gto';

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

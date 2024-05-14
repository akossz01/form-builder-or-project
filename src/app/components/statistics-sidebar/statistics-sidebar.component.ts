import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistics-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics-sidebar.component.html',
  styleUrl: './statistics-sidebar.component.css',
})
export class StatisticsSidebarComponent implements OnInit {
  public forms: { [key: string]: string } = {};
  userToken: string | any;

  constructor(private http: HttpClient, private router: Router) { // Inject Router
    this.userToken = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this.loadForms();
  }

  async loadForms() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      auth: this.userToken,
    });

    return this.http
      .get<any>('http://141.147.42.101/form/get_all_forms_id', { headers })
      .toPromise()
      .then((data) => {
        const organizedData: { [key: string]: string } = {};

        for (const option in data) {
          if (data.hasOwnProperty(option)) {
            organizedData[option] = data[option];
          }
        }

        this.forms = organizedData;
        console.log(this.forms);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  selectForm(formId: string) {
    console.log(formId);

    // Navigate to the statistics route with the formId parameter
    this.router.navigate(['/statistics', formId]); // Assuming '/statistics/:formId' is your desired route
  }
}

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css',
})
export class DynamicFormComponent {
  formDetails: any;
  selectedOptions: string[] = [];
  errorNoSelection: boolean = false;
  submitted: boolean = false;
  completedEarlier: boolean = false;
  private userToken: string | any;

  forms: any[] = [
    {
      id: 'abc123',
      title: 'Melyek a kedvenc ételeid?',
      desc: 'Kérlek válaszd ki a kedvenc ételeidet!',
      options: ['Pizza', 'Hamburger', 'Sushi', 'Saláta', 'Pasta'],
    },
    {
      id: 'def456',
      title: 'Form 2',
      desc: 'Description for Form 2',
      options: ['Option A', 'Option B', 'Option C'],
    },
  ];

  formId: string | any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((params) => {
      this.formId = params.get('formId');
    });

    this.userToken = localStorage.getItem('token');
    
    await this.loadFormDetails();
  }

  async loadFormDetails() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth': this.userToken,
      'form-id': this.formId,
    });
    
    return this.http.get<any>('http://141.147.42.101/form/get_form_data', { headers })
    .toPromise()
    .then(data => {
      this.formDetails = data;      
      
      return this.formDetails;
    })
    .catch(error => {
      console.error('Error loading form details:', error);
      throw error;
    });
  }

  onCheckboxChange(option: string, event: any) {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.selectedOptions.push(option);
    } else {
      const index = this.selectedOptions.indexOf(option);
      if (index >= 0) {
        this.selectedOptions.splice(index, 1);
      }
    }

    this.errorNoSelection = this.selectedOptions.length === 0;
  }


  onSubmit() {
    // Call the API to submit the form
    // /form/submit -> header: token, body: form_id, opciok
    if (this.selectedOptions.length === 0) {
      console.log('Please select at least one option for form: ' + this.formId);
      this.errorNoSelection = this.selectedOptions.length === 0;
    } else {
      this.submitted = true;
      
      

      console.log(
        'Form submitted with options: ' +
          this.selectedOptions.join(', ') +
          ' for form: ' +
          this.formId
      );
    }
  }
}

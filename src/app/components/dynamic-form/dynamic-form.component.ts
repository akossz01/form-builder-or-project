import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css',
})
export class DynamicFormComponent {
  formDetails: any;
  selectedOptions: string[] = [];
  errorNoSelection: boolean = false;
  submitted: boolean = false;
  completedEarlier: boolean = false;

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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.formId = params.get('formId');
      this.formDetails = this.getFormData(this.formId);
    });

    // Fetcheles utan megnezzuk ha az adott hasznalo kitoltotte mar a formot
    // pl. /form/check_form_completed -> header: token, body: form_id
    /* fetch('http://141.147.42.101:3001/form/check_form_completed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: 'your_token_here',
      },
      body: JSON.stringify({ form_id: this.formId }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.completedEarlier = data.completed;
      })
      .catch((error) => {
        console.error('Error checking form completion:', error);
      }); */

    // this.completedEarlier = true;
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

  getFormData(formId: string) {
    const formData = this.forms.find((form) => form.id === formId);
    return formData;
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

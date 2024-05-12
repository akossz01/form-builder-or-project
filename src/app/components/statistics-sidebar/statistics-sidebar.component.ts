import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './statistics-sidebar.component.html',
  styleUrl: './statistics-sidebar.component.css',
})
export class StatisticsSidebarComponent implements OnInit {
  public forms = [];
  // forms = [{shortId: 'abc123', name: 'Form 1'}, {shortId: 'asd123', name: 'Form 2'}]

  ngOnInit(): void {
    this.loadForms();
  }

  loadForms() {
    throw new Error('Method not implemented.');
  }

  selectForm(formId: string) {
    throw new Error('Method not implemented.');
    // itt atalitjuk a linket (routot) uh /statistics/:formId
  }
}

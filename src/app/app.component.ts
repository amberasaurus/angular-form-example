import { Component, OnInit } from '@angular/core';
import { FormLoaderService } from './services/form-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private formLoaderService: FormLoaderService) {}

  ngOnInit(): void {
    this.formLoaderService.loadSafeZoo();
  }
}

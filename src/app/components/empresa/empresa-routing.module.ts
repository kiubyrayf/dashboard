import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'main',
        component: MainComponent,
        data: {
          title: 'Main',
          breadcrumb: 'Main'
        }
      }
    ]
  }
];
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'usuarios',
        component: UsersComponent,
        data: {
          title: 'Usuarios',
          breadcrumb: 'Usuarios'
        }
      },
      {
        path: 'usuario/:id',
        component: UserComponent,
        data: {
          title: 'Usuario',
          breadcrumb: 'Usuario'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

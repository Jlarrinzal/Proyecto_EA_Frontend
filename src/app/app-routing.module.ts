import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { UserComponent } from './components/user/user.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

const routes: Routes = [
{
  path:'',
  redirectTo: 'inicio',
  pathMatch:'full'
},
{
  path:'inicio',
  component: InicioComponent
},
{
  path:'user',
  component: UserComponent
},
{
  path:'detail/:username',
  component: UserDetailComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

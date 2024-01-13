import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from './guard.guard';

const routes: Routes = [
  {path:'', canActivate:[GuardGuard],
  loadChildren: () => import(`./dashboard/dashboard.module`).then(m => m.DashboardModule)
  },
  {path:'login',
  loadChildren: () => import(`./auth/auth.module`).then(m => m.AuthModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes ,  { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

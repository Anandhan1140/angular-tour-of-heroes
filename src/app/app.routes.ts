import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';




export const routes: Routes = [
    // {path:'',component:AppComponent},  //normally appcomponenet run so we dont  need to mention 
  { path: 'heroes', component: HeroesComponent }  ,
  {path:'dashboard',component:DashboardComponent },
  {path:'',redirectTo:'/dashboard',pathMatch:'full'},
  {path:'detail/:id',component:HeroDetailComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)     
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor,RouterLink,HeroSearchComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
      heroes: Hero[]=[];

      constructor(private heroservice:HeroService){}

      ngOnInit(): void {
        this.getHeroes();
      }

      getHeroes():void{
        this.heroservice.getHeroes().subscribe(heroes=>this.heroes=heroes.slice(1,5));
      }


}

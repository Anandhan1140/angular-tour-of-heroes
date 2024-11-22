import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import {UpperCasePipe} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../hero.service';
import { NgFor,NgIf } from '@angular/common';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { MessageService } from '../message.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [UpperCasePipe,FormsModule,NgFor,NgIf,HeroDetailComponent,RouterLink],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})

export class HeroesComponent  implements OnInit{

  // selectedHero ?: Hero; 
  heroes : Hero[] = [];
 message: string[] = [];

   constructor(private heroService : HeroService,private messageService : MessageService ){}

  //  getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }

  //  ngOnInit():void{
  //   // this.heroes=this.heroService.getHeroes();   due to implemetne observable we need to change the code 
  //   this.heroService.getHeroes()
  //   .subscribe(heroes => this.heroes = heroes);
  //   console.log('Heroes:', this.heroes);
  //  }

  //  selectedHero ?: Hero;
  //   onSelect(hero:Hero):void{
  //     this.selectedHero = hero;
  //   }
  ngOnInit(): void {  
    this.heroService.getHeroes().subscribe(heroes => 
      {this.heroes = heroes;
      let heroesVariable = heroes;
      console.log(heroes);
      console.log(...heroes);
      });    
  }

  // onSelect(hero:Hero):void{
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  //   let messageValue = this.messageService.messages;
  // }

  getHeroes():void{
    this.heroService.getHeroes()
    .subscribe(heroes=> this.heroes = heroes);    
  }
  
  
  add(name:string):void{
    debugger;
    name= name.trim();
    if(!name){
      return;
    }
    this.heroService.addHero({name} as Hero).subscribe(hero=>{
        this.heroes.push(hero)
    });
  }

  delete(hero:Hero):void{
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

}


import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-hero-search',
  standalone: true,
  imports: [RouterLink,NgFor,CommonModule],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.css'
})
export class HeroSearchComponent implements OnInit{

  heroes$! : Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}


  search(term:string):void{
    this.searchTerms.next(term);
  }


  ngOnInit(): void {
    debugger;
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),  
       distinctUntilChanged(),
       //if i remove thjis line i get this error
      switchMap((term: string) => this.heroService.searchHeroes(term)),

    )
  }

}

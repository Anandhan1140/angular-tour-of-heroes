import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable,of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class HeroService { 
  
  private heroesUrl = 'api/heroes'; 

  // // it uses  RxJS of() function to return an array of mock heroes 
  // getHeroes():Observable<Hero[]>{
  //   this.messageService.add('HeroService: fetched heroes');
  //   const heroes = of(HEROES);
  //   return heroes;  
  // }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => { 
    
      console.error(error);  
     
      this.log(`${operation} failed: ${error.message}`);  
     
      return of(result as T);
    };
  }

  getHeroes():Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched Hero')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    )
  }

  // getHero(id:Number):Observable<Hero>{
  //   const hero = HEROES.find(h=>h.id == id)!;
  //   this.messageService.add(`Heroservice:fetched hero id=${id}`);
  //   return of(hero);
  // }

  //get heroes by http
  getHero(id:Number):Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id = ${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )

  }

  private log(message:string){
    this.messageService.add(`HeroService: ${message}`);
  }

/** PUT: update the hero on the server */
updateHero(hero: Hero): Observable<any> {
  return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${hero.id}`)),
    catchError(this.handleError<any>('updateHero'))
  );
}

// /** POST: add a new hero to the server */
addHero(hero: Hero): Observable<Hero> {
  debugger;
  return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
    tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
  );
}

/** DELETE: delete the hero from the server */
deleteHero(id:Number):Observable<Hero>{
  debugger;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id = ${id}`)),
      catchError(this.handleError<Hero>('deleted hero' ))
    );
}

/* GET heroes whose name contains search term */
searchHeroes(term:string):Observable<Hero[]>{
  if(!term.trim()){
    return of([]);
  }
  return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}}`).pipe(
    tap(x => x.length ?
      this.log(`found heroes matching "${term}"`) :
      this.log(`no heroes matching "${term}"`)),
   catchError(this.handleError<Hero[]>('searchHeroes', []))
 );
  
}

  //http header
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private messageService : MessageService,private http:HttpClient) { }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnDestroy {

  showMore: boolean = false;
  movieById: boolean = false;
  showHistory: number = 0;
  subscription?: Subscription;
  title: string = '';
  movie!: Movie;
  movies!: Movie[];
  check: string = "";

  constructor(
    private apiService: ApiService,
  ) { }


  show() {
    this.showMore = !this.showMore;
  }

  viewTile() {
    this.movieById = !this.movieById;
  }

  searchMovie(): void {
    this.subscription = this.apiService
      .searchMovieByTitle(this.title)
      .subscribe(
        response => {
          if (response) {
            this.movie = response;
            console.log("By Search " + response);
            this.check = this.movie.title;
          }
        });
    this.showHistory = 1;
    this.searchHistory();
  }

  getMovieById(): void {
    this.subscription = this.apiService
      .getMovieById(this.movie.imdbID)
      .subscribe(
        response => {
          if (response) {
            this.movie = response;
            console.log("By Id " + response);
          }
        });
    this.movieById = !this.movieById;
  }

  searchHistory(): void {
    this.subscription = this.apiService
      .getSearchHistory()
      .subscribe(
        response => {
          if (response) {
            this.movies = response.reverse();
            console.log("History " + response);
          }
        });
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

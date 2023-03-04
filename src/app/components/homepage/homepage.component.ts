import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private spinner: NgxSpinnerService
  ) { }


  show() {
    this.showMore = !this.showMore;
  }

  viewTile() {
    this.movieById = !this.movieById;
  }

  searchMovie(): void {
    this.spinner.show(); 
    this.subscription = this.apiService
      .searchMovieByTitle(this.title)
      .subscribe({
        next: (response) => {
          if (response) {
            this.movie = response;
            console.log("By Search " + response);
            this.check = this.movie.title;
          }
        },
        error: (error) => {
          this.spinner.hide(); 
          console.error(error);
        },
        complete: () => {
          this.spinner.hide(); 
        }
      });
    this.showHistory = 1;
    this.searchHistory();
  }


  getMovieById(): void {
    this.spinner.show(); 
    this.subscription = this.apiService.getMovieById(this.movie.imdbID).subscribe({
      next: (response) => {
        if (response) {
          this.movie = response;
          console.log("By Id " + response);
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.spinner.hide(); 
        this.movieById = !this.movieById;
      },
    });
  }
  

  searchHistory(): void {
    this.spinner.show(); 
    this.subscription = this.apiService
      .getSearchHistory()
      .subscribe({
        next: (response) => {
          if (response) {
            this.movies = response.reverse();
            console.log("History " + response);
          }
        },
        error: (err) => {
          console.log("Error: " + err);
          this.spinner.hide(); 
        },
        complete: () => {
          this.spinner.hide(); 
        },
      });
  }




  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

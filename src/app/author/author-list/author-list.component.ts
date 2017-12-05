import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { Author } from '../author-core/author.model';
import { AuthorService } from '../author-core/author.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit {

  public authors: Author[];
  public count: number = 0;
  isLoading: boolean;

  constructor(private authorService: AuthorService) {
    this.authors = [];
  }

  ngOnInit() {
    this.isLoading = true;
    this.authorService.getAll()
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((body:any) => {
        this.count = body.count;
        body.rows.forEach((row:any) => {
          this.authors = [...this.authors, new Author(row)]
        })
        // this.authors = authors ? authors : [];
        console.log("authors: ", this.authors);
        console.log("rows: ", body.rows);
      });
  }

}

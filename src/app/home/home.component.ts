import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { InfoService } from './info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  info: string;
  isLoading: boolean;

  constructor(private infoService: InfoService) {}

  ngOnInit() {
    // this.isLoading = true;
    // this.infoService.getInfo()
    //   .pipe(finalize(() => { this.isLoading = false; }))
    //   .subscribe((info: string) => { this.info = info; });
  }

}

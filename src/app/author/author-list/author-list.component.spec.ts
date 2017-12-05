import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../../shared/shared.module';
import { AuthorListComponent } from './author-list.component';
import { AuthorService } from '../author-core/author.service';

describe('AuthorListComponent', () => {
  let component: AuthorListComponent;
  let fixture: ComponentFixture<AuthorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          IonicModule.forRoot(AuthorListComponent),
          SharedModule
        ],
        declarations: [AuthorListComponent],
        providers: [
          AuthorService,
          MockBackend,
          BaseRequestOptions,
          {
            provide: Http,
            useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            },
            deps: [MockBackend, BaseRequestOptions]
          }
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

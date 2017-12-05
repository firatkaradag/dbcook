import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { EditorDirective } from './froala/froala.directive';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
  ],
  declarations: [
    LoaderComponent,
    EditorDirective
  ],
  exports: [
    LoaderComponent,
    EditorDirective
  ]
})
export class SharedModule { }

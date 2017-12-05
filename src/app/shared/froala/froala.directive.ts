import { Directive, ElementRef, NgZone, Input } from '@angular/core';
import { FroalaEditorDirective } from 'angular-froala-wysiwyg';

import * as $ from 'jquery'; window["$"] = $; window["jQuery"] = $;
import "froala-editor/js/froala_editor.pkgd.min.js";

@Directive({
  selector: '[froalaEditor]'
})
export class EditorDirective extends FroalaEditorDirective {

  constructor(el: ElementRef, zone: NgZone) {
    super(el, zone);
  }
}

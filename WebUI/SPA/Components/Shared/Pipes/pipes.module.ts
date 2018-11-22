import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/primeng';
import { KeysPipe, EnumKeysPipe } from './keys.pipe';

@NgModule({
	imports: [
	],
	declarations: [
        KeysPipe,
        EnumKeysPipe
	],
    exports: [
        KeysPipe,
        EnumKeysPipe
	]
})
export class PipesModule { }
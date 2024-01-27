import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { StudentsComponent } from './students.component';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { StudentFormComponent } from './components/student-form/student-form.component';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { SharedModule } from '../../../../shared/shared.module';
import { TamTitulosDirective } from '../../../../shared/tam-titulos.directive';



@NgModule({
  declarations: [
    StudentsComponent,
    StudentFormComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    BrowserModule,
    FormsModule,
    MatSortModule,
    MatTabsModule,
    MatButtonModule,
    MatGridListModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    StudentsComponent
  ]
})
export class StudentsModule { }

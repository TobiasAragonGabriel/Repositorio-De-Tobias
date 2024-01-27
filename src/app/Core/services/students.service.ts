import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private selectedStudentSource = new BehaviorSubject<any>(null);
  selectedStudent$ = this.selectedStudentSource.asObservable();

  setSelectedStudent(student: any): void {
    this.selectedStudentSource.next(student);
  }
}
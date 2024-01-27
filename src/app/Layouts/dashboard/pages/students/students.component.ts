import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Usuarios } from './Models';
import { MatTabGroup } from '@angular/material/tabs';
import { StudentsService } from '../../../../Core/services/students.service';
import Swal from 'sweetalert2';

const STUDENTS_DATA: Usuarios[] = [
  { IDEstudiante: 1, Nombre: 'Pepe', Apellido: "Gomez", Dni: "23776895", Telefono: "1123616867", Correo: 'pepeeldiablo@example.com', Direccion: 'Alfonsina 3123', Usuario: "PepeDiablo", Clave: "Pepe1234", Rol: "Estudiante", Anio: 4, Comision: '12vo' },
  { IDEstudiante: 2, Nombre: 'Tobias', Apellido: 'Aragon', Dni: '47118641', Telefono: '1125444392', Correo: 'tobiasaragon@example.com', Direccion: 'Alvear 1331', Usuario: 'TobiDios', Clave: 'Tobi1234', Rol: 'Estudiante', Anio: 6, Comision: '10mo' },
 
]

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})

export class StudentsComponent {
  displayedColumns: string[] = ['demo-nombre', 'demo-telefono', 'demo-correo', 'demo-acciones'];
  dataSource = STUDENTS_DATA;
  filteredDataSource = [...STUDENTS_DATA];
  selectedYear: number = 0;
  selectedStudentForEdit: any;
  @ViewChild('filterInput') filterInput!: ElementRef;
  @ViewChild(MatSelect) yearSelect!: MatSelect;
  @ViewChild('addStudentForm') addStudentForm!: NgForm; 
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  @ViewChild('modifyStudentForm') modifyStudentForm!: NgForm;
  years = [
    { value: 0, viewValue: 'Todos los grados' },
    { value: 1, viewValue: '1' },
    { value: 2, viewValue: '2' },
    { value: 3, viewValue: '3' },
    { value: 4, viewValue: '4' },
    { value: 5, viewValue: '5' },
    { value: 6, viewValue: '6' },
  ];

  yearsForAddStudent = this.years.filter(year => year.value !== 0);
  
  applyFilter() {
    const filterValue = this.filterInput.nativeElement.value.toLowerCase().trim();

    if (this.selectedYear === 0) {
      this.filteredDataSource = this.dataSource.filter((element: any) =>
        Object.values(element).some((value: any) =>
          value.toString().toLowerCase().includes(filterValue)
        )
      );
    } else {
      this.filteredDataSource = this.dataSource
        .filter(element => element.Anio === this.selectedYear)
        .filter((element: any) =>
          Object.values(element).some((value: any) =>
            value.toString().toLowerCase().includes(filterValue)
          )
        );
    }
  }

  applyYearFilter() {
    this.selectedYear = this.yearSelect.value;
    if (this.selectedYear === 0) {
      this.filteredDataSource = [...this.dataSource];
    } else if (this.selectedYear) {
      this.filteredDataSource = this.dataSource.filter(element => element.Anio === this.selectedYear);
    } else {
      this.filteredDataSource = [...this.dataSource];
    }
  }


  handleFormSubmission(eventData: any): void {
    const formValues = eventData.formValues;
    const actionType = eventData.actionType;
  
    if (actionType === 'Agregar') {
      this.addStudent(formValues);
    } else if (actionType === 'Modificar') {
      this.modifyStudent(formValues);
    } else if (actionType === 'Cancelar'){
      this.selectedStudentForEdit = null;
      this.tabGroup.selectedIndex = 0;
    }
  }

  constructor(private studentService : StudentsService) {}

  editStudent(selectedStudent: any) {
    this.studentService.setSelectedStudent(selectedStudent);
    this.studentService.selectedStudent$.subscribe(student => {
      this.selectedStudentForEdit = student;
      this.tabGroup.selectedIndex = 1;
    });
  }

  deleteStudent(element: any): void {
    const index = this.filteredDataSource.findIndex(e => e === element);

    Swal.fire({
      title: "¿Seguro deseas eliminar a este estudiante?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        if (index !== -1) {
          this.filteredDataSource.splice(index, 1);
          this.filteredDataSource = [...this.filteredDataSource];
        }
        Swal.fire({
          position: 'top-end',
          title: 'Estudiante eliminado.',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });    
  }

  modifyStudent(formValues: any): void {
    if (this.selectedStudentForEdit) {
      this.selectedStudentForEdit.Nombre = formValues.nombre;
      this.selectedStudentForEdit.Apellido = formValues.apellido;
      this.selectedStudentForEdit.Dni = formValues.dni;
      this.selectedStudentForEdit.Telefono = formValues.telefono;
      this.selectedStudentForEdit.Correo = formValues.correo;
      this.selectedStudentForEdit.Direccion = formValues.direccion;
      this.selectedStudentForEdit.Usuario = formValues.usuario;
      this.selectedStudentForEdit.Clave = formValues.clave;
      this.selectedStudentForEdit.Rol = formValues.rol;
      this.selectedStudentForEdit.Anio = formValues.anio;
      this.selectedStudentForEdit.Comision = formValues.comision;
  
      const indexInDataSource = this.dataSource.findIndex(student => student.IDEstudiante === this.selectedStudentForEdit.IDEstudiante);
      if (indexInDataSource !== -1) {
        this.dataSource[indexInDataSource] = { ...this.selectedStudentForEdit };
      }
  
      this.selectedStudentForEdit = null;
  
      this.applyYearFilter();
      this.tabGroup.selectedIndex = 0;
    }
  }
  

  addStudent(formValues: any): void {
    const newStudent: Usuarios = {
      IDEstudiante: STUDENTS_DATA.length + 1,
      Nombre: formValues.nombre,
      Apellido: formValues.apellido,
      Dni: formValues.dni,
      Telefono: formValues.telefono,
      Correo: formValues.correo,
      Direccion: formValues.direccion,
      Usuario: formValues.usuario,
      Clave: formValues.clave,
      Rol: formValues.rol,
      Anio: formValues.anio,
      Comision: formValues.comision
    };
  
    this.filteredDataSource.push(newStudent);
    this.dataSource = [...this.filteredDataSource];
    this.applyYearFilter();
  }
  
}
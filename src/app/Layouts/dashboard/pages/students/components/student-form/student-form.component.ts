import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from '../../../../../../Core/services/students.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss'
})

export class StudentFormComponent {

  years = [
    { value: 0, viewValue: 'Sin Grado Asignado' },
    { value: 1, viewValue: '1°' },
    { value: 2, viewValue: '2°' },
    { value: 3, viewValue: '3°' },
    { value: 4, viewValue: '4°' },
    { value: 5, viewValue: '5°' },
    { value: 6, viewValue: '6°' },
  ];

  @Output() formularioEnviado: EventEmitter<any> = new EventEmitter();
  userFormGroup: FormGroup;
  selectedStudent: any;
  isEditarVisible: boolean = false;
  isAgregarVisible: boolean = true;
  isCancelarVisible: boolean = false;

  constructor(private formBuilder: FormBuilder, private studentService : StudentsService) {
    this.userFormGroup = this.formBuilder.group({
      nombre: this.formBuilder.control('', Validators.required),
      apellido: this.formBuilder.control('', Validators.required),
      dni: this.formBuilder.control('', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]),
      direccion: this.formBuilder.control('', Validators.required),
      correo: this.formBuilder.control('', [Validators.required, Validators.email]),
      telefono: this.formBuilder.control('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      usuario: this.formBuilder.control('', Validators.required),
      clave: this.formBuilder.control('', Validators.required),
      rol: this.formBuilder.control('', Validators.required),
      anio: this.formBuilder.control('', Validators.required)
    })
  }

  ngOnInit() {
    this.studentService.selectedStudent$.subscribe(student => {
      this.selectedStudent = student;
      this.populateForm();
    });
  }

  private populateForm(): void {
    if (this.selectedStudent) {
      this.isEditarVisible = true;
      this.isCancelarVisible = true;
      this.isAgregarVisible = false;
      this.userFormGroup.patchValue({
        nombre: this.selectedStudent.Nombre || '',
        apellido: this.selectedStudent.Apellido || '',
        dni: this.selectedStudent.Dni || '',
        direccion: this.selectedStudent.Direccion || '',
        correo: this.selectedStudent.Correo || '',
        telefono: this.selectedStudent.Telefono || '',
        usuario: this.selectedStudent.Usuario || '',
        clave: this.selectedStudent.Clave || '',
        rol: this.selectedStudent.Rol || '',
        anio: this.selectedStudent.Anio || null
      });
    }
  }
  

  onSubmit(event: Event, actionType: string): void {
    event.preventDefault();
    if (this.userFormGroup.invalid) {

      if (this.userFormGroup.get('correo')?.hasError('email')) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ingrese un correo electrónico válido'
        });
      }else if(this.userFormGroup.get('telefono')?.hasError('pattern')) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ingrese un teléfono válido'
        });
      }else if(this.userFormGroup.get('dni')?.hasError('pattern')) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: '¡Ingrese un DNI válido!'
        });
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No puede dejar campos sin informacion'
        });
      }
    } else {
      const formValues = this.userFormGroup.value;
      this.formularioEnviado.emit({ formValues, actionType });
      if(actionType === 'Agregar')
      {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Estudiante agregado',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.formularioEnviado.emit(this.userFormGroup.value);
          this.userFormGroup.reset();
          this.userFormGroup.markAsPristine();
          this.userFormGroup.markAsUntouched();
        });
      }else if(actionType === 'Modificar'){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Estudiante modificado',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.formularioEnviado.emit(this.userFormGroup.value);
          this.userFormGroup.reset();
          this.userFormGroup.markAsPristine();
          this.userFormGroup.markAsUntouched();
          this.isEditarVisible = false;
          this.isCancelarVisible = false;
          this.isAgregarVisible = true;
        });
      }else if(actionType === 'Cancelar'){
        this.formularioEnviado.emit();
        this.isEditarVisible = false;
        this.isCancelarVisible = false;
        this.isAgregarVisible = true;
        this.userFormGroup.reset();
        this.userFormGroup.markAsPristine();
        this.userFormGroup.markAsUntouched();
      }
    }
  }
}

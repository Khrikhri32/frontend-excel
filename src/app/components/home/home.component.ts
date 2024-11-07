import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  file: File | null = null;
  usuarios: any[] = [];
  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  onUpload() {
    if (this.file) {
      this.authService.uploadFile(this.file).subscribe({
        next: (response) => {
          this.successMessage = 'Archivo cargado exitosamente';
          this.errorMessage = '';
        },
        error: () => {
          this.errorMessage = 'Error al cargar el archivo';
          this.successMessage = '';
        },
      });
    }
  }

  onConsultar() {
    this.authService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: () => {
        this.errorMessage = 'Error al obtener los datos';
      },
    });
  }
}

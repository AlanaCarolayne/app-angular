import { Component } from '@angular/core';
import { CategoriaServiceService } from './../../services/categoria.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Categorias } from '../../interfaces/categorias';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
})
export class CategoriaComponent {
  categoriaForm: FormGroup = new FormGroup({});
  categorias: Categorias[] = [];
  categoriaIdEdicao: string | null = null;

  constructor(
    private categoriaService: CategoriaServiceService,
    private formBuilder: FormBuilder
  ) {
    this.categoriaForm = formBuilder.group({
      nome: ['', Validators.required],
      descricao: [''],
      ativa: [false, Validators.required],
    });
  }

  // Método para listar categorias
  list(): void {
    this.categoriaService.list().subscribe((categorias) => (this.categorias = categorias));
  }

  // Método executado ao inicializar o componente
  ngOnInit(): void {
    this.list();
  }

  // Função para gerar um ID aleatório
  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // Função de salvar ou editar uma categoria
  save(): void {
    if (this.categoriaForm.valid) {
      const formData = this.categoriaForm.value;
        // Caso esteja inserindo nova categoria
        const categoriaAdd: Categorias = {
          id: this.generateRandomString(6),
          nome: formData.nome,
          descricao: formData.descricao,
          ativa: formData.ativa,
        };
        this.categoriaService.add(categoriaAdd).subscribe()
      }

      this.categoriaForm.reset();
      this.list(); // Limpa o formulário após o salvamento
    }
  }




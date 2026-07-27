import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { PROGRAMMING_LANGUAGES } from '../../../core/constants/languages.constants';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-project.html',
  styleUrl: './create-project.scss',
})
export class CreateProject {
  private readonly fb = inject(FormBuilder);

  readonly languages = PROGRAMMING_LANGUAGES;

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],

    description: ['', [Validators.maxLength(500)]],

    primaryLanguage: ['JAVA'],
  });
}

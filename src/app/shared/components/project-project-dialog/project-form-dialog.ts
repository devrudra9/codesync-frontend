import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { finalize } from 'rxjs/operators';

import { Input, OnChanges, SimpleChanges } from '@angular/core';

import { Project } from '../../../features/projects/models/project';
import { UpdateProjectRequest } from '../../../features/projects/models/update-project-request';

import { PROGRAMMING_LANGUAGES } from '../../../core/constants/languages.constants';
import { ProjectService } from '../../../features/projects/services/project.service';
import { CreateProjectRequest } from '../../../features/projects/models/create-project-request';

@Component({
  selector: 'app-project-form-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-form-dialog.html',
  styleUrl: './project-form-dialog.scss',
})
export class ProjectFormDialog implements OnChanges {
  private readonly fb = inject(FormBuilder);
  private readonly projectService = inject(ProjectService);

  @Input()
  mode: 'create' | 'edit' = 'create';

  @Input()
  project?: Project;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project'] && this.project) {
      this.form.patchValue({
        name: this.project.name,
        description: this.project.description ?? '',
        primaryLanguage: this.project.primaryLanguage ?? this.form.controls.primaryLanguage.value,
      });
    }
  }

  @Output()
  close = new EventEmitter<void>();

  @Output()
  created = new EventEmitter<void>();

  isSubmitting = false;

  readonly languages = PROGRAMMING_LANGUAGES;

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],

    description: ['', [Validators.maxLength(500)]],

    primaryLanguage: ['JAVA'],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    if (this.mode === 'create') {
      const request = this.form.getRawValue();

      this.projectService
        .createProject(request)
        .pipe(finalize(() => (this.isSubmitting = false)))
        .subscribe({
          next: () => {
            this.created.emit();
            this.close.emit();
          },
          error: console.error,
        });

      return;
    }

    if (!this.project) {
      this.isSubmitting = false;
      return;
    }

    const request: UpdateProjectRequest = this.form.getRawValue();

    this.projectService
      .updateProject(this.project.id, request)
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: () => {
          this.created.emit();
          this.close.emit();
        },
        error: console.error,
      });
  }
}

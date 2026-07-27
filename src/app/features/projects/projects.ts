import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';

import { ProjectCard } from '../../shared/components/project-card/project-card';

import { Project } from './models/project';
import { ProjectService } from './services/project.service';

import { ProjectFormDialog } from '../../shared/components/project-project-dialog/project-form-dialog';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCard, ProjectFormDialog],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit {
  private readonly projectService = inject(ProjectService);

  projects: Project[] = [];

  showCreateDialog = false;
  dialogMode: 'create' | 'edit' = 'create';
  editingProject: Project | null = null;

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  openProject(projectId: number): void {
    window.location.assign(`/app/editor/${projectId}`);
  }

  editProject(projectId: number): void {
    const project = this.projects.find((item) => item.id === projectId);
    if (project) {
      this.dialogMode = 'edit';
      this.editingProject = project;
      this.showCreateDialog = true;
    }
  }

  deleteProject(projectId: number): void {
    this.projectService.deleteProject(projectId).subscribe({
      next: () => this.loadProjects(),
      error: (err) => console.error(err),
    });
  }

  openCreateDialog(): void {
    this.dialogMode = 'create';
    this.editingProject = null;
    this.showCreateDialog = true;
  }

  closeCreateDialog(): void {
    this.showCreateDialog = false;
    this.editingProject = null;
  }

  onProjectCreated(): void {
    this.closeCreateDialog();
    this.loadProjects();
  }
}

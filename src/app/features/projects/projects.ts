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
    console.log('Open Project:', projectId);
  }

  editProject(projectId: number): void {
    console.log('Edit Project:', projectId);
  }

  deleteProject(projectId: number): void {
    console.log('Delete Project:', projectId);
  }

  openCreateDialog(): void {
    this.showCreateDialog = true;
  }

  closeCreateDialog(): void {
    this.showCreateDialog = false;
  }

  onProjectCreated(): void {
    this.closeCreateDialog();
    this.loadProjects();
  }
}

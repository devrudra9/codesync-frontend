import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProjectService } from '../projects/services/project.service';
import { Project } from '../projects/models/project';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './editor.html',
  styleUrl: './editor.scss',
})
export class Editor implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);

  project: Project | null = null;
  selectedLanguage = 'JAVA';
  code = `public class App {\n  public static void main(String[] args) {\n    System.out.println("Hello CodeSync");\n  }\n}`;
  output = '';
  error = '';
  status = 'Ready';
  executionTime = '—';
  isRunning = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const projectId = Number(params.get('projectId'));
      if (projectId) {
        this.projectService.getProject(projectId).subscribe({
          next: (project) => {
            this.project = project;
            this.selectedLanguage = project.primaryLanguage?.toUpperCase() ?? 'JAVA';
          },
          error: (err) => console.error(err),
        });
      }
    });
  }

  runCode(): void {
    this.isRunning = true;
    this.status = 'Running';
    this.output = '';
    this.error = '';
    this.executionTime = '—';

    setTimeout(() => {
      this.isRunning = false;
      this.status = 'Completed';
      this.output = 'Execution completed successfully.';
      this.executionTime = '120ms';
    }, 600);
  }
}

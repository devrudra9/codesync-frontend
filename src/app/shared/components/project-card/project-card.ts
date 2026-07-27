import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Project } from '../../../features/projects/models/project';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard {
  @Input({ required: true })
  project!: Project;

  @Output()
  open = new EventEmitter<number>();

  @Output()
  edit = new EventEmitter<number>();

  @Output()
  delete = new EventEmitter<number>();

  onOpen(): void {
    this.open.emit(this.project.id);
  }

  onEdit(): void {
    this.edit.emit(this.project.id);
  }

  onDelete(): void {
    this.delete.emit(this.project.id);
  }
}

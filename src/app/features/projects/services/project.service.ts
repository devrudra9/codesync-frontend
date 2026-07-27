import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { API_ENDPOINTS } from '../../../core/constants/api.constants';

import { Project } from '../models/project';
import { CreateProjectRequest } from '../models/create-project-request';
import { UpdateProjectRequest } from '../models/update-project-request';

import { map } from 'rxjs/operators';
import { ApiResponse } from '../../../core/models/api-response';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = `${environment.apiUrl}${API_ENDPOINTS.PROJECTS.BASE}`;

  getProjects(): Observable<Project[]> {
    return this.http
      .get<ApiResponse<Project[]>>(this.baseUrl)
      .pipe(map((response) => response.data));
  }

  getProject(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/${projectId}`);
  }

  createProject(request: CreateProjectRequest): Observable<Project> {
    return this.http
      .post<ApiResponse<Project>>(this.baseUrl, request)
      .pipe(map((response) => response.data));
  }

  updateProject(id: number, request: UpdateProjectRequest): Observable<Project> {
    return this.http
      .put<ApiResponse<Project>>(`${this.baseUrl}/${id}`, request)
      .pipe(map((response) => response.data));
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}${API_ENDPOINTS.PROJECTS.BASE}/${id}`);
  }
}

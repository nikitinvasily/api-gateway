import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Project } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class ProjectService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Project[]>(`${environment.apiUrl}/projects`);
    }

    getById(id: number) {
        return this.http.get<Project>(`${environment.apiUrl}/projects/${id}`);
    }

    save(project: Project) {
        if (project.id == 0) {
            return this.http.post<Project>(`${environment.apiUrl}/projects`, project);
        } else {
            return this.http.put<Project>(`${environment.apiUrl}/projects`, project);
        }
    }
}

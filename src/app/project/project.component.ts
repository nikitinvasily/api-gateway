import { Component, OnInit } from '@angular/core';
import { Project, User } from '@app/_models';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
})

export class ProjectComponent {
  projectId: number;
  project: Project;
  currentUser: User;
 
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.params.projectId;
    this.projectService.getById(this.projectId).pipe(first()).subscribe(project => {
        this.project = project;
      });
  }
}

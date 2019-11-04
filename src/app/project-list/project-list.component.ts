import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { User, Project, Role } from '@app/_models';
import { UserService, ProjectService, AuthenticationService } from '@app/_services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClrForm } from '@clr/angular';

@Component({ templateUrl: 'project-list.component.html' })
export class ProjectListComponent implements OnInit {
    @ViewChild(ClrForm, {static: true}) clrForm;

    isLoading = false;
    currentUser: User;
    userFromApi: User;
    userProjects: Project[];

    editOpened: boolean = false;
    editProject: Project = new Project();
    error: string;

    projectForm = new FormGroup({
        title: new FormControl('', Validators.required),
        version: new FormControl('', Validators.required),
        description: new FormControl(''),
        url: new FormControl('', Validators.required)
    });

    constructor(
        private userService: UserService,
        private projectService: ProjectService,
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.isLoading = true;

        this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
            this.isLoading = false;
            this.userFromApi = user;
        });

        this.updateProjects();
    }

    updateProjects() {
        this.projectService.getAll().pipe(first()).subscribe(projects => {
            this.isLoading = false;
            this.userProjects = projects;
        });
    }

    get isAdmin() {
        return this.currentUser && this.currentUser.role === Role.Admin;
    }

    onEditClick(projectId: number) {
        this.projectForm.reset();

        if (projectId > 0) {
            this.projectService.getById(projectId).pipe(first()).subscribe(project => {
                this.editProject = project;
                
                this.projectForm.setValue({
                    title: this.editProject.title,
                    version: this.editProject.version,
                    description: this.editProject.description,
                    url: this.editProject.url
                });
                
                this.editOpened = true;
            });
        } else {
            this.editProject = new Project();
            this.editProject.id = 0;
            this.editOpened = true;
        }
    }

    onSubmit() {
        this.error = null;
        if (this.projectForm.invalid) {
            this.clrForm.markAsTouched();
            return;
        }

        const value = this.projectForm.value;
        this.editProject.title = value.title;
        this.editProject.version = value.version;
        this.editProject.description = value.description;
        this.editProject.url = value.url;

        this.projectService.save(this.editProject)
            .pipe(first())
            .subscribe(
                project => {
                    this.editOpened = false;
                    this.updateProjects();
                },
                error => {
                    this.error = error;
                });
    }
}

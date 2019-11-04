import { Routes, RouterModule } from '@angular/router';

import { ProjectListComponent } from './project-list';
import { UserListComponent } from './user-list';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
    {
        path: '',
        component: ProjectListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'users',
        component: UserListComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'project/:projectId',
        component: ProjectComponent
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService, UserService } from './_services';
import { User, Role } from './_models';
import { first } from 'rxjs/operators';

@Component({selector: 'app', templateUrl: 'app.component.html'})

export class AppComponent{
    loading = false;
    currentUser: User;
    userFromApi: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private route: ActivatedRoute
    ) {
        this.authenticationService.currentUser.subscribe(x => {
            this.currentUser = x;
            if (x !== null) {
                this.userService.getById(this.currentUser.id).pipe(first()).subscribe(
                    user => {
                        this.loading = false;
                        this.userFromApi = user;
                    }
                );
            } else {
                this.userFromApi = null;
            }
        });
    }

    get isAdmin() {
        return this.currentUser && this.currentUser.role === Role.Admin;
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    click() {
        
    }
}

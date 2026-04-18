import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { SignUp } from './pages/sign-up/sign-up';
import { Notfound } from './shared/notfound/notfound';

export const routes: Routes = [
    {
        path:'',
        component:Home
    },
    {
        path:'login',
        component:Login
    },
    {
        path:'signup',
        component:SignUp
    },
    {
        path:'**',
        component:Notfound
    }
];

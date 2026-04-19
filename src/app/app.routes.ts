import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { SignUp } from './pages/sign-up/sign-up';
import { Notfound } from './pages/notfound/notfound';
import { Filter } from './shared/destination-comp/filter/filter';
import { Destinations } from './pages/destinations/destinations';

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
        path:"destinations",
        component: Destinations
    },
    {
        path:'**',
        component:Notfound
    }
];

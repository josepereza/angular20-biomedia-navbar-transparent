import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Portafolio } from './pages/portafolio/portafolio';

export const routes: Routes = [
    {
        path:'', redirectTo:'home', pathMatch:'full'
    },
    {
        path:'home' , component:Home
    },
    {
        path:'portafolio', component:Portafolio
    }
];

import { ResolveService } from './shared/services/resolve.service';
import { MainPageComponent } from './components/main-page/main-page.component';
import {NgModule} from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, Params } from '@angular/router';
import {CustomPreloading} from './shared/classes/custom-preloading';
import { AuthGuard } from './shared/classes/auth.guard';
import { OfferComponent } from './components/offer/offer.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';


const routes:Routes=[
  {path:'',component:MainPageComponent,pathMatch:'full'},
  {path:'admin', loadChildren:()=>import('./components/admin/admin.module').then(m=>m.AdminModule),canActivate:[AuthGuard]},
  {path:'offer',component:OfferComponent,canActivate:[AuthGuard] },
  {path:'aboutus',component:AboutComponent},
  {path:'contact',component:ContactComponent }

]
// loadChildren:()=>import('./components/admin/admin.module').then(m=>m.AdminModule) рядок для прелоудінга
@NgModule({
    imports:[
        RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules })
    ],
    exports:[
        RouterModule
    ],
    providers:[CustomPreloading,ResolveService]
})
export class AppRoutingModule{

}

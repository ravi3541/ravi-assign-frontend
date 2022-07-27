import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingModule } from './modules/shopping/shopping.module';

const routes: Routes = [
  {path:"shopping", loadChildren:()=> import('./modules/shopping/shopping.module').then(m => m.ShoppingModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

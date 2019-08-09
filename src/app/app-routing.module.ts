import { PageComponent } from './shared/components/page/page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninCallbackComponent } from './shared/components/authentication/signin-callback.component';

const routes: Routes = [
  {
    path: 'spade/signin-callback',
    component: SigninCallbackComponent
  },
  {
    path: 'spade/signin-callback-v2',
    component: SigninCallbackComponent
  },
  {
    path: '**',
    component: PageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

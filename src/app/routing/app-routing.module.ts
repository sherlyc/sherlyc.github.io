import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SigninCallbackComponent } from "../shared/components/authentication/signin-callback.component";
import { PageComponent } from "../shared/components/page/page.component";
import { RedirectRouteGuard } from "./redirect-route.guard";

const routes: Routes = [
  {
    path: "spade/signin-callback-v2",
    component: SigninCallbackComponent
  },
  {
    path: "**",
    component: PageComponent,
    canActivate: [RedirectRouteGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: "enabled"
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

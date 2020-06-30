import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { RegisterComponent } from './components/register/register.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { EditComponent } from './components/edit/edit.component';
import { UnforeseenComponent } from './components/unforeseen/unforeseen.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'user', component: UserComponent },
  { path: 'administrator', component: AdministratorComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'all-users', component: AllUsersComponent },
  { path: 'edit-user', component: EditComponent },
  { path: 'update-border', component: UnforeseenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

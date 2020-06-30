import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './services/UserService/user.service';
import { UserComponent } from './components/user/user.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { RegisterComponent } from './components/register/register.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { EditComponent } from './components/edit/edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { UnforeseenComponent } from './components/unforeseen/unforeseen.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    AdministratorComponent,
    RegisterComponent,
    AllUsersComponent,
    EditComponent,
    UnforeseenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDZm1Bq053QXgGiCUurrI-w6k5jtYxaZF4'
    }),
    AgmDirectionModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

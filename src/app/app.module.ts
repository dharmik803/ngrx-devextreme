import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { ActionComponent } from './components/action/action.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DevExtremeModule } from './devextreme.module';
import { Action2Component } from './components/action2/action2.component';
import { Action3Component } from './components/action3/action3.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { foodReducer } from './store/ngrx.reducer';
import { FoodEffects } from './store/ngrx.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ActionComponent,
    Action2Component,
    Action3Component,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DevExtremeModule,
    StoreModule.forRoot({food : foodReducer}),
    EffectsModule.forRoot([FoodEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode()})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

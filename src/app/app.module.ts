import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SetimagePopupPage } from './setimage-popup/setimage-popup.page';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, ReactiveFormsModule,],
  
  providers: [Camera, File,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, SetimagePopupPage, SQLite],
  bootstrap: [AppComponent],
})
export class AppModule {}

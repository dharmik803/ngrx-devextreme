import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DxResponsiveBoxModule } from 'devextreme-angular';
import { Observable, map } from 'rxjs';
import * as safeJsonStringify from 'safe-json-stringify';
import { MasterService } from 'src/app/services/master.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private service: MasterService, 
    private formBuilder: FormBuilder,
    private route: Router
    ){
    
  }

  ngOnInit(): void {
    
   
    
  }

 
  
}



import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/service/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user : any ;
  constructor( private apiService : ApiService) { }

  ngOnInit(): void {
    this.user = this.apiService.getCurrentUser() ;
    console.log(this.user);
    
  }

}

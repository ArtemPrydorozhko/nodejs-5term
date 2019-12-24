import { Component, OnInit } from '@angular/core';
import { TokenService } from '../shared/services/token/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private tokenService: TokenService,
              private router: Router) { }

  ngOnInit() {
  }

  public onLogout() {
    this.tokenService.deleteToken();
    this.router.navigate(['/login']);
  }

}

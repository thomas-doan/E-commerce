import { TokenService } from 'src/app/_services/token.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aheader',
  templateUrl: './aheader.component.html',
  styleUrls: ['./aheader.component.scss'],
})
export class AheaderComponent {
  constructor(private TokenService: TokenService) {}

  ngOnInit(): void {}

  logout(): void {
    this.TokenService.removeToken();
  }
}

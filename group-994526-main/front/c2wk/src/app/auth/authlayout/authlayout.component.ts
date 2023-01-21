import { Component } from '@angular/core';
import { faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-authlayout',
  templateUrl: './authlayout.component.html',
  styleUrls: ['./authlayout.component.scss'],
})
export class AuthlayoutComponent {
  myfaInstagram = faInstagram;
  myfaGithub = faGithub;
}

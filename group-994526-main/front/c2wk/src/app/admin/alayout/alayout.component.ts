import { Component } from '@angular/core';
import { faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-alayout',
  templateUrl: './alayout.component.html',
  styleUrls: ['./alayout.component.scss'],
})
export class AlayoutComponent {
  myfaInstagram = faInstagram;
  myfaGithub = faGithub;
}

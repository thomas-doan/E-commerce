import { Component } from '@angular/core';
import { faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-playout',
  templateUrl: './playout.component.html',
  styleUrls: ['./playout.component.scss'],
})
export class PlayoutComponent {
  myfaInstagram = faInstagram;
  myfaGithub = faGithub;

  constructor() {}
}

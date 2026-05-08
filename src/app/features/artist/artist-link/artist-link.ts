import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-artist-link',
  imports: [NzButtonModule],
  templateUrl: './artist-link.html',
  styleUrl: './artist-link.scss',
})
export class ArtistLink {
  artistName = input.required<string>()
  artistId = input.required<number>()
  private readonly router = inject(Router);
  

  goToArtistPage(){
    this.router.navigate(['artist', this.artistId])
  }
}

import { Component, DestroyRef, inject, signal } from '@angular/core';
import { SearchService } from '../../services/search-service';
import { SearchItem } from '../../models/search-item.model';
import { debounceTime, distinctUntilChanged, Subject, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SearchResultsCard } from '../search/search-results-card/search-results-card';
import { SearchInput } from '../search/search-input/search-input';
import { Router, RouterOutlet } from '@angular/router';
import { Library } from '../library/library';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AudioPlayer } from '../audio-player/audio-player';

@Component({
  selector: 'app-dashboard',
  imports: [SearchInput, Library, RouterOutlet, AudioPlayer],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}

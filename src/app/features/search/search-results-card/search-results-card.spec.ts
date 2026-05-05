import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsCard } from './search-results-card';

describe('SearchResultsCard', () => {
  let component: SearchResultsCard;
  let fixture: ComponentFixture<SearchResultsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchResultsCard],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResultsCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

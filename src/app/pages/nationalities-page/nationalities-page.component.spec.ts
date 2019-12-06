import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalitiesPageComponent } from './nationalities-page.component';

describe('NationalitiesPageComponent', () => {
  let component: NationalitiesPageComponent;
  let fixture: ComponentFixture<NationalitiesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NationalitiesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalitiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

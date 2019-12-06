import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialitiesPageComponent } from './specialities-page.component';

describe('SpecialitiesPageComponent', () => {
  let component: SpecialitiesPageComponent;
  let fixture: ComponentFixture<SpecialitiesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialitiesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialitiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

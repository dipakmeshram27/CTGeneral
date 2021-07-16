import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisDailogComponent } from './diagnosis-dailog.component';

describe('DiagnosisDailogComponent', () => {
  let component: DiagnosisDailogComponent;
  let fixture: ComponentFixture<DiagnosisDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosisDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosisDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

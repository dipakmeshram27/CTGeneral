import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureDailogComponent } from './procedure-dailog.component';

describe('ProcedureDailogComponent', () => {
  let component: ProcedureDailogComponent;
  let fixture: ComponentFixture<ProcedureDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedureDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveNoteComponent } from './receive-note.component';

describe('ReceiveNoteComponent', () => {
  let component: ReceiveNoteComponent;
  let fixture: ComponentFixture<ReceiveNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiveNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

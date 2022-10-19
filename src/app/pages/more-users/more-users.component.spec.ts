import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreUsersComponent } from './more-users.component';

describe('MoreUsersComponent', () => {
  let component: MoreUsersComponent;
  let fixture: ComponentFixture<MoreUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

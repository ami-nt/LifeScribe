import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarMainComponent } from './top-bar-main.component';

describe('TopBarMainComponent', () => {
  let component: TopBarMainComponent;
  let fixture: ComponentFixture<TopBarMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopBarMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopBarMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

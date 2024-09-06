import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDirectiveComponent } from './template-directive.component';

describe('TemplateDirectiveComponent', () => {
  let component: TemplateDirectiveComponent;
  let fixture: ComponentFixture<TemplateDirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplateDirectiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

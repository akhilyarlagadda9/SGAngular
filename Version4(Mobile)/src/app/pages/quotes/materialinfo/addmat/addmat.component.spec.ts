import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddmatComponent } from './addmat.component';

describe('AddmatComponent', () => {
  let component: AddmatComponent;
  let fixture: ComponentFixture<AddmatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmatComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddmatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

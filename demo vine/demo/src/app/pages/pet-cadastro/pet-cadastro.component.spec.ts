import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetCadastroComponent } from './pet-cadastro.component';

describe('PetCadastroComponent', () => {
  let component: PetCadastroComponent;
  let fixture: ComponentFixture<PetCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetCadastroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PetCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

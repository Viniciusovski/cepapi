import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '../../../services/address.service';
import { CepService } from '../../../services/cep.service';
import { ToastrService } from 'ngx-toastr';
import { Address, AddressRequest } from '../../../models/address.model';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {
  addressForm: FormGroup;
  isEditMode = false;
  addressId?: number;
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private addressService: AddressService,
    private cepService: CepService,
    private toastr: ToastrService
  ) {
    this.addressForm = this.fb.group({
      street: ['', Validators.required],
      number: ['', Validators.required],
      complement: [''],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      cep: ['', [Validators.required, Validators.minLength(8)]],
      userId: [null, Validators.required]
    });
  }

  get f() { return this.addressForm.controls; }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.addressId = +params['id'];
        this.loadAddress(this.addressId);
      }
    });

    // Definir o usuário atual como padrão
    const user = JSON.parse(localStorage.getItem('user') || {};
    this.addressForm.patchValue({ userId: user.id });
  }

  loadAddress(id: number): void {
    this.loading = true;
    this.addressService.getAddress(id).subscribe({
      next: (address) => {
        this.addressForm.patchValue({
          street: address.street,
          number: address.number,
          complement: address.complement,
          neighborhood: address.neighborhood,
          city: address.city,
          state: address.state,
          cep: address.cep,
          userId: address.userId
        });
        this.loading = false;
      },
      error: (err) => {
        this.toastr.error('Erro ao carregar endereço');
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.addressForm.invalid) {
      return;
    }
    
    this.loading = true;
    const addressData: AddressRequest = this.addressForm.value;
    
    if (this.isEditMode && this.addressId) {
      this.addressService.updateAddress(this.addressId, addressData).subscribe({
        next: () => {
          this.toastr.success('Endereço atualizado com sucesso');
          this.router.navigate(['/dashboard/addresses']);
        },
        error: (err) => {
          this.toastr.error('Erro ao atualizar endereço: ' + (err.error?.message || ''));
          this.loading = false;
        }
      });
    } else {
      this.addressService.createAddress(addressData).subscribe({
        next: () => {
          this.toastr.success('Endereço criado com sucesso');
          this.router.navigate(['/dashboard/addresses']);
        },
        error: (err) => {
          this.toastr.error('Erro ao criar endereço: ' + (err.error?.message || ''));
          this.loading = false;
        }
      });
    }
  }

  searchCep(): void {
    const cep = this.f.cep.value.replace(/\D/g, '');
    
    if (cep.length !== 8) {
      this.toastr.warning('CEP deve conter 8 dígitos');
      return;
    }
    
    this.loading = true;
    this.cepService.getAddress(cep).subscribe({
      next: (data) => {
        if (data.erro) {
          this.toastr.warning('CEP não encontrado');
        } else {
          this.addressForm.patchValue({
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf
          });
        }
        this.loading = false;
      },
      error: () => {
        this.toastr.error('Erro ao consultar CEP');
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/dashboard/addresses']);
  }
}
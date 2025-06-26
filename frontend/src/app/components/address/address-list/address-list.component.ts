import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../../services/address.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {
  addresses: any[] = [];
  loading = false;

  constructor(
    private addressService: AddressService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadAddresses();
  }

  loadAddresses(): void {
    this.loading = true;
    const user = this.authService.getUser();
    
    if (user && user.id) {
      this.addressService.getAddressesByUser(user.id).subscribe({
        next: (addresses) => {
          this.addresses = addresses;
          this.loading = false;
        },
        error: (err) => {
          this.toastr.error('Erro ao carregar endereços');
          this.loading = false;
        }
      });
    } else {
      this.toastr.error('Usuário não autenticado');
      this.loading = false;
    }
  }

  createAddress(): void {
    // Navegação será tratada pelo router
  }

  editAddress(id: number): void {
    // Navegação será tratada pelo router
  }

  deleteAddress(id: number): void {
    if (confirm('Tem certeza que deseja excluir este endereço?')) {
      this.loading = true;
      this.addressService.deleteAddress(id).subscribe({
        next: () => {
          this.toastr.success('Endereço excluído com sucesso');
          this.loadAddresses();
        },
        error: (err) => {
          this.toastr.error('Erro ao excluir endereço');
          this.loading = false;
        }
      });
    }
  }
}
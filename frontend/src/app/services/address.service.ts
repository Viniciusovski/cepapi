import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Address, AddressRequest } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAddressesByUser(userId: number): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.apiUrl}/addresses/user/${userId}`);
  }

  getAddress(id: number): Observable<Address> {
    return this.http.get<Address>(`${this.apiUrl}/addresses/${id}`);
  }

  createAddress(address: AddressRequest): Observable<Address> {
    return this.http.post<Address>(`${this.apiUrl}/addresses`, address);
  }

  updateAddress(id: number, address: AddressRequest): Observable<Address> {
    return this.http.put<Address>(`${this.apiUrl}/addresses/${id}`, address);
  }

  deleteAddress(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/addresses/${id}`);
  }
}
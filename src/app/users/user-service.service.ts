import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface User {
  id: number;
  Name: string;
  Mobile: string;
  Email: string;
  Age: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private users: User[] = [];
  private nextId: number = 1;

  constructor() {
    this.users = [
      { id: this.nextId++, Name: 'John Doe', Mobile: '1234567890', Email: 'john.doe@example.com', Age: 30 },
      { id: this.nextId++, Name: 'Jane Doe', Mobile: '0987654321', Email: 'jane.doe@example.com', Age: 25 }
    ];
  }

  GetAllUsers(): Observable<User[]> {
    return of(this.users);
  }

  AddUpdateUser(user: User, type: 'Add' | 'Update'): Observable<User> {
    if (type === 'Add') {
      user.id = this.nextId++;
      this.users.push(user);
    } else {
      const index = this.users.findIndex(u => u.id === user.id);
      if (index !== -1) {
        this.users[index] = user;
      }
    }
    return of(user);
  }

  checkEmailExists(email: string): Observable<boolean> {
    return of(this.users.some(user => user.Email === email));
  }

  DeleteUserById(id: number): Observable<void> {
    this.users = this.users.filter(user => user.id !== id);
    return of();
  }

  GetUserById(id: number): Observable<any> {
    const user = this.users.find(u => u.id == id);
    return of(user);
  }
}

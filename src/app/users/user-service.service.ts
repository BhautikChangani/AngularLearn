import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, map } from 'rxjs';

export interface User {
  id: number | null;
  name: string | null;
  mobile: string | null;
  email: string | null;
  age: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private users = new BehaviorSubject<User[]>([
    { id: 1, name: 'Bhautik', mobile: '1234567890', email: 'bk@gmail.com', age: 30 },
    { id: 2, name: 'Harsh', mobile: '1234567899', email: 'harsh@gmail.com', age: 19 }
  ]);
  private nextId: number = 1;

  constructor() { }

  GetAllUsers(): Observable<User[]> {
    return this.users.asObservable();
  }

  AddUpdateUser(user: User, type: 'Add' | 'Update'): Observable<User> {
    let users = this.users.getValue();

    if (type === 'Add') {
      user.id = this.nextId++;
      users = [...users, user];
    } else {
      users = users.map(u => u.id === user.id ? user : u);
    }

    this.users.next(users);
    return of(user);
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.users.pipe(
      map(user => user.some(user => user.email === email))
    );
  }

  DeleteUserById(id: number): Observable<void> {
    const users = this.users.getValue().filter(user => user.id !== id);
    this.users.next(users);
    return of();
  }

  GetUserById(id: number): Observable<User | undefined> {
    return this.users.pipe(
      map(user => user.find(user => user.id === id))
    );
  }
}

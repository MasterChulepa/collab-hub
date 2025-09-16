import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RoomDTO {
  id: number;
  name: string;
  version: number;
}

@Injectable({ providedIn: 'root' })
export class RoomsService {
  private http = inject(HttpClient);

  createRoom(name: string): Observable<RoomDTO> {
    return this.http.post<RoomDTO>(`${window.location.origin}/api/rooms`, {
      name,
    });
  }
}

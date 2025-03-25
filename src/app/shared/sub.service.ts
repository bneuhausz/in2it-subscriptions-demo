import { Injectable, signal } from "@angular/core";
import { BehaviorSubject, interval } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubService {
  readonly #dataStream = new BehaviorSubject<number>(0);
  shouldLog = signal(true);

  constructor() {
    interval(3000).subscribe(value => {
      if (this.shouldLog()) console.log('Emitting value:', value);
      this.#dataStream.next(value);
    });
  }

  getDataStream() {
    return this.#dataStream.asObservable();
  }
}

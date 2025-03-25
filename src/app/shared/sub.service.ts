import { Injectable } from "@angular/core";
import { BehaviorSubject, interval } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubService {
  readonly #dataStream = new BehaviorSubject<number>(0);

  constructor() {
    interval(3000).subscribe(value => {
      console.log('Emitting value:', value);
      this.#dataStream.next(value);
    });
  }

  getDataStream() {
    return this.#dataStream.asObservable();
  }
}

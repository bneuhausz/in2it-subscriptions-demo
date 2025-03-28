import { Injectable, signal } from "@angular/core";
import { BehaviorSubject, interval, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubService {
  /**
   * This BehaviorSubject is used to emit values every 3 seconds.
   * The first emit happens when the firs subscription is created, with the initial value of 0.
   * The value is incremented by 1 every 3 seconds.
   * In the do-this-* components, this subscription is handled properly, but if do-not-do-this component subscribes to it,
   * it will create a new subscription every time the button is clicked, leading to multiple subscriptions running at the same time.
   * On top of that, the subscriptions are not being unsubscribed when the component is destroyed, so, even if do-not-do-this component gets destroyed,
   * the subscriptions will keep running, leading to memory leaks and potentially unexpected behavior.
   */
  readonly #dataStream = new BehaviorSubject<number>(0);

  /**
   * This signal is used to keep track of how many subscriptions are currently active.
   */
  readonly activeSubscriptions = signal(0);

  /**
   * This turns #dataStream into an observable, so it can be subscribed to in the components.
   * It also increments the activeSubscriptions signal when a new subscription is created and decrements it when a subscription is destroyed.
   */
  dataStream$ = this.#dataStream.asObservable().pipe(
    tap({
      next: () => {},
      subscribe: () => {
        this.activeSubscriptions.update(value => value + 1);
      },
      unsubscribe: () => {
        this.activeSubscriptions.update(value => Math.max(0, value - 1));
      }
    })
  );

  /**
   * This is just here for demo purposes, so different concepts can be shown without the subscription spamming the console.
   */
  shouldLog = signal(false);

  constructor() {
    interval(3000).subscribe(value => {
      if (this.shouldLog()) console.log('Emitting value:', value);
      this.#dataStream.next(value);
    });
  }
}

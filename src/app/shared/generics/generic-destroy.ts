import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class GenericDestroyComponent implements OnDestroy {
  public $unsubscribe = new Subject<void>();

  ngOnDestroy() {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }
}

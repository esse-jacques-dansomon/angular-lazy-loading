import { inject, Injector, Type } from '@angular/core';
import { defer, Observable } from 'rxjs';

export function lazyService<T>(loader: () => Promise<Type<T>>): Observable<T> {
  const injector = inject(Injector);

  return defer(() => {
    return loader().then((service) => injector.get(service));
  });
}

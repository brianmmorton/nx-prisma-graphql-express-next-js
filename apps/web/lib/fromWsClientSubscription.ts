import { Observable } from 'rxjs';
import type { Client, SubscribePayload } from 'graphql-ws';

/**
 * @see https://github.com/enisdenjo/graphql-ws#observable
 */
export function fromWsClientSubscription<TData = Record<string, unknown>>(
  client: Client,
  payload: SubscribePayload
) {
  return new Observable<TData | null>((observer) =>
    client.subscribe<TData>(payload, {
      next: (data) => observer.next(data.data),
      error: (err) => observer.error(err),
      complete: () => observer.complete(),
    })
  );
}
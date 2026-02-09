import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

/**
 * HTTP Interceptor to automatically track loading states for API calls
 *
 * Usage:
 * - Add 'X-Loading-Key' header to specify a custom loading key
 * - Add 'X-Skip-Loading' header to skip loading tracking
 *
 * Example:
 * this.http.get('/api/data', {
 *   headers: { 'X-Loading-Key': 'my-component' }
 * })
 */
export const loadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const loadingService = inject(LoadingService);

  // Check if we should skip loading for this request
  const skipLoading = req.headers.has('X-Skip-Loading');
  if (skipLoading) {
    // Remove the custom header before sending
    const cleanReq = req.clone({
      headers: req.headers.delete('X-Skip-Loading')
    });
    return next(cleanReq);
  }

  // Get custom loading key or generate one from URL
  let loadingKey = req.headers.get('X-Loading-Key');
  let cleanReq = req;

  if (loadingKey) {
    // Remove the custom header before sending
    cleanReq = req.clone({
      headers: req.headers.delete('X-Loading-Key')
    });
  } else {
    // Generate key from URL path
    const url = new URL(req.url, window.location.origin);
    loadingKey = `api:${url.pathname}`;
  }

  // Start loading
  loadingService.startLoading(loadingKey);

  return next(cleanReq).pipe(
    finalize(() => {
      // Stop loading when request completes (success or error)
      loadingService.stopLoading(loadingKey!);
    })
  );
};

import { CancellationSource } from '../api/models/CancelationSource';
import { useCallback, useEffect, useState } from 'react';

export const useCancellationToken = (): ((func: (source: CancellationSource) => any) => any) => {
  const [cancellationSource, setCancellationSource] = useState<CancellationSource>(new CancellationSource());

  useEffect(() => {
    return () => cancellationSource.cancel();
  }, [cancellationSource]);

  const call = useCallback((action: (source: CancellationSource) => any) => {
    const newCancellationSource = new CancellationSource();
    setCancellationSource(newCancellationSource);
    return action(newCancellationSource);
  }, []);

  return call;
};
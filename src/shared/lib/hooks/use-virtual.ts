import { useCallback, useEffect, useRef } from 'react';

export type UseVirtualArgs = {
  setSize: (id: number | string, height: number) => void;
  id: number;
};

export const useVirtualItem = ({ setSize, id }: UseVirtualArgs) => {
  const itemRef = useRef<null | HTMLElement>(null);

  useEffect(() => {
    if (itemRef.current) {
      const height = itemRef.current.getBoundingClientRect().height;
      setSize(id, height);
    }
  }, [setSize, id]);

  return { itemRef };
};

type Entity = {
  id: string;
};

type VirtualListRef = {
  resetAfterIndex: (index: number) => void;
};

export function useVirtualList<T>(items: (T & Entity)[]) {
  const listRef = useRef<VirtualListRef | null>(null);
  const sizeMap = useRef<{ [key: string]: number }>({});

  const setSize = useCallback(
    (id: string, size: number) => {
      if (sizeMap.current[id] !== size && listRef.current) {
        sizeMap.current[id] = size;
        const index = items.findIndex((item) => item.id === id);

        listRef.current.resetAfterIndex(index);
      }
    },
    [items],
  );

  const getSize = (id: string) => sizeMap.current[id] || 50;

  return { listRef, setSize, getSize };
}

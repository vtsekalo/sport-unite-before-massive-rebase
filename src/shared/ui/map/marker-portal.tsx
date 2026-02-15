import { FC, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import * as mapgl from '@2gis/mapgl/types';

import { MapMarker } from '@shared/lib';

import { Styled } from './base-map.styled';

interface MarkerPortalProps {
  map: mapgl.Map;
  api: typeof mapgl;
  data: MapMarker;
}

export const MarkerPortal: FC<MarkerPortalProps> = ({ map, api, data }) => {
  const [isHovered, setIsHovered] = useState(false);

  const container = useMemo(() => {
    const div = document.createElement('div');
    div.style.willChange = 'transform';
    return div;
  }, []);

  const markerInstance = useRef<mapgl.HtmlMarker | null>(null);

  useLayoutEffect(() => {
    if (!markerInstance.current) {
      markerInstance.current = new api.HtmlMarker(map, {
        coordinates: data.coordinates,
        html: container,
        anchor: [20, 57],
        zIndex: data.zIndex,
      });
    } else {
      markerInstance.current.setCoordinates(data.coordinates);
      markerInstance.current.setZIndex(data.zIndex);
    }

    return () => {
      if (markerInstance.current) {
        markerInstance.current.destroy();
        markerInstance.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, api, container]);

  useLayoutEffect(() => {
    if (markerInstance.current) {
      markerInstance.current.setCoordinates(data.coordinates);
      const finalZIndex = isHovered ? 1000000 : data.zIndex;
      markerInstance.current.setZIndex(finalZIndex);
    }
  }, [data.coordinates, data.zIndex, isHovered]);

  return createPortal(
    <Styled.MarkerContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        data.onClick?.();
      }}
    >
      {data.icon}
    </Styled.MarkerContainer>,
    container,
  );
};

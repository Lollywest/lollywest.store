import React, { RefObject } from 'react';
import { Config } from 'hls.js';
export interface HlsPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    hlsConfig?: Config;
    playerRef?: RefObject<HTMLVideoElement>;
    src: string;
}
declare function ReactHlsPlayer({ hlsConfig, playerRef, src, autoPlay, ...props }: HlsPlayerProps): JSX.Element;
export default ReactHlsPlayer;

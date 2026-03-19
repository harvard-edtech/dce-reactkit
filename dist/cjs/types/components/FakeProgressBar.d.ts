/**
 * Fake progress bar that approaches completion but never fully finishes.
 * Built on top of the existing ProgressBar component.
 *
 * Two phases:
 *   1. Fast phase (0–90%): random jumps of 1–5% at randomized intervals,
 *      paced to reach ~90% in roughly estimatedTimeSec seconds.
 *   2. Slow phase (90–99%): crawls 1% at a time with longer random delays,
 *      never reaching 100% on its own.
 *
 * When isFinished becomes true, the bar immediately jumps to 100%.
 * @author Yuen Ler Chow
 */
import React from 'react';
import Variant from '../types/Variant';
import ProgressBarSize from '../types/ProgressBarSize';
type Props = {
    isFinished?: boolean;
    estimatedTimeSec?: number;
    striped?: boolean;
    variant?: Variant;
    bgVariant?: Variant;
    showOutline?: boolean;
    size?: ProgressBarSize;
};
declare const FakeProgressBar: React.FC<Props>;
export default FakeProgressBar;

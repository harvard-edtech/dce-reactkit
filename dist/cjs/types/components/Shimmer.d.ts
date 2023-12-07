/**
 * A shimmer effect to add to the background of an element. The parent of this element
 *   will automatically have its overflow hidden
 * @author Alessandra De Lucas
 * @author Gabe Abrams
 */
import React from 'react';
type Props = {
    durationSec?: number;
    numShimmers?: number;
};
declare const Shimmer: React.FC<Props>;
export default Shimmer;

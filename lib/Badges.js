import { LF } from 'md-writer';
import { URL } from 'node:url';

/**
 * @typedef {Object} Badge
 * @property {string} alt
 * @property {string} image
 * @property {string} link
 * @property {string} style
 */

export default class Badges extends Array {
    /**
     * @returns {string}
     */
    toString() {
        return (
            this.map((badge) => {
                const imageUrl = new URL(badge.image);

                if (badge.style) imageUrl.searchParams.set('style', badge.style);

                return `[![${badge.alt}](${imageUrl.toString()})](${badge.link})`;
            }).join(LF) || ''
        );
    }
}

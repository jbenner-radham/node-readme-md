import { LF } from 'md-writer';
import { URL } from 'node:url';

/**
 * @extends {Array<import('./index.js').Badge>}
 */
export default class Badges extends Array {
    /**
     * Return a string representation of the badges.
     *
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

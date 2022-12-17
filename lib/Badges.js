import { LF } from 'md-writer';

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
        return this.map(badge => {
            const style = badge.style ? `style=${badge.style}` : '';

            return `[![${badge.alt}](${badge.image}?${style})](${badge.link})`;
        }).join(LF) || '';
    }
}

import { LF } from 'md-writer';

export default class Badges extends Array {
    /**
     * Return a string representation of the badges.
     *
     * @returns {string}
     */
    toString() {
        return (
            this.map((badge) => {
                return `[![${badge.alt}](${badge.image})](${badge.link})`;
            }).join(LF) || ''
        );
    }
}

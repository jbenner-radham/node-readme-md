import { LF, h2 } from 'md-writer';

/**
 * A `PositionDirective` is a string which begins with either "before:" or
 * "after:" and the section title to search for.
 *
 * @example
 * { position: 'after:Install' }
 * @example
 * { position: 'before:License' }
 * @typedef {string} PositionDirective
 */

export default class ReadmeSections extends Array {
    /**
     * @param {PositionDirective} position
     * @returns {number}
     */
    getPositionIndex(position) {
        const after = /after:(.+)/.exec(position);

        if (after) {
            const [, title] = after;

            return this.getSectionIndex(title) + 1;
        }

        const before = /before:(.+)/.exec(position);

        if (before) {
            const [, title] = before;

            return this.getSectionIndex(title);
        }

        const radix = 10;

        return parseInt(position, radix);
    }

    /**
     * @param {string} [title='']
     * @returns {number}
     */
    getSectionIndex(title = '') {
        return this.reduce((accumulator, sectionPair, index) => {
            const [header] = sectionPair;

            return header == h2(title) ? index : accumulator; // eslint-disable-line eqeqeq
        }, NaN);
    }

    /**
     * @returns {string}
     */
    toString() {
        return this.map((headerBodyPair) => headerBodyPair.join(LF)).join(`${LF}${LF}`);
    }
}

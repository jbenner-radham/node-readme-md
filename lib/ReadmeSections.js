import { LF, h2 } from 'md-writer';

/**
 * @extends {Array<import('./ReadmeSections.js').ReadmeSection>}
 */
export default class ReadmeSections extends Array {
    /**
     * Get the position index for a section from a position directive.
     *
     * @param {import('./index.js').PositionDirective} position
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
     * Get the position index for a section from the section title.
     *
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
     * Returns a string representation of the readme.
     *
     * @returns {string}
     */
    toString() {
        return this.map((headerBodyPair) => headerBodyPair.join(LF)).join(`${LF}${LF}`);
    }
}

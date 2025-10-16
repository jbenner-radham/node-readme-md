import type { PositionDirective, ReadmeSection } from './types.js';
import { h2, LF } from 'md-writer';

export default class ReadmeSections extends Array<ReadmeSection> {
  /**
   * Get the position index for a section from a number or position directive.
   */
  getPositionIndex(position: number | PositionDirective): number {
    if (typeof position === 'number') {
      if (Number.isNaN(position)) {
        console.warn(
          'The provided position is `NaN`, it should be an integer, float, or `PositionDirective`.'
        );
      }

      return position;
    }

    if (typeof position !== 'string') {
      console.warn(
        'The provided position should be an integer, float, or `PositionDirective`.',
        `Received a ${typeof position}.`
      );

      return NaN;
    }

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

    console.warn(
      'The provided position is of type `PositionDirective` but is not in the form of' +
        ' `after:*` or `before:*`.'
    );

    return NaN;
  }

  /**
   * Get the position index for a section from the section title.
   */
  getSectionIndex(title = ''): number {
    const sectionIndex = this.reduce((accumulator, sectionPair, index) => {
      const [header] = sectionPair;

      return header.toUpperCase() === h2(title).toUpperCase() ? index : accumulator;
    }, NaN);

    if (Number.isNaN(sectionIndex))
      console.warn(`Could not find a section with the title "${title}".`);

    return sectionIndex;
  }

  /**
   * Returns a string representation of the readme.
   */
  toString(): string {
    return this.map(headerBodyPair => headerBodyPair.join(LF)).join(`${LF}${LF}`);
  }
}

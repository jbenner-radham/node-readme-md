import type { Badge } from './types.js';
import { LF } from 'md-writer';

export default class Badges extends Array<Badge> {
  /**
   * Return a string representation of the badges.
   */
  toString(): string {
    return (
      this.map(badge => {
        return `[![${badge.alt}](${badge.image})](${badge.link})`;
      }).join(LF) || ''
    );
  }
}

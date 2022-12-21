import type { Badge } from './index.js';

export default class Badges extends Array<Badge> {
    /**
     * Return a string representation of the badges.
     */
    toString(): string;
}

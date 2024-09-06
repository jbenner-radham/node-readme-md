import type { Badge } from './index.d.ts';

export default class Badges extends Array<Badge> {
    /**
     * Return a string representation of the badges.
     */
    toString(): string;
}

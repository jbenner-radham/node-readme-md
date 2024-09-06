import type { PositionDirective } from './index.d.ts';

export type ReadmeSection = [header: string, body: string];

export default class ReadmeSections extends Array<ReadmeSection> {
    /**
     * Get the position index for a section from a number or position directive.
     */
    getPositionIndex(position: number | PositionDirective): number;

    /**
     * Get the position index for a section from the section title.
     */
    getSectionIndex(title: string = ''): number;

    /**
     * Returns a string representation of the readme.
     */
    toString(): string;
}

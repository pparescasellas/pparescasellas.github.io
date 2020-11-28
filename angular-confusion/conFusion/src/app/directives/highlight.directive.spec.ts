import { HighlightDirective } from './highlight.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('HighlightDirective', () => {
    it('should create an instance', () => {
        let a: ElementRef;
        let b: Renderer2;
        const directive = new HighlightDirective(a, b);
        expect(directive).toBeTruthy();
    });
});

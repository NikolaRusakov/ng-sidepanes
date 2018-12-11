import {
  animate,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const moveAnim = trigger('moveAnim',
  [
    state('in',
      style({
        right: '{{pos}}px',
        // transform: 'translateX({{pos}}px)',
      }), {
        params: {pos: '0', col: '*'},
      },
    ), state('hidden',
    style({
      right: '{{pos}}px',
      // transform: 'translateX({{pos}}px)',
    }), {
      params: {pos: '0', col: '*'},
    }),
    state('move',
      style({
        right: '{{pos}}px',
        // transform: 'translateX({{pos}}px)',
      }), {
        params: {pos: '0', col: '*'},
      },
    ), state('moveAgain',
    style({
      right: '{{pos}}px',
      // transform: 'translateX({{pos}}px)',
    }), {
      params: {pos: '0', col: '*'},
    },
  ),
    transition('* <=> *', animate('750ms ease')),
  ],
);

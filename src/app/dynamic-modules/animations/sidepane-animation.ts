import {
  animate,
  query,
  style,
  transition,
  trigger,
  state,
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  // The '* => *' will trigger the animation to change between any two states
  transition('* => *', [
    // The query function has three params.
    // First is the event, so this will apply on entering or when the element is added to the DOM.
    // Second is a list of styles or animations to apply.
    // Third we add a config object with optional set to true, this is to signal
    // angular that the animation may not apply as it may or may not be in the DOM.
    query(
      ':enter',
      [style({opacity: 0})],
      {optional: true},
    ),
    query(
      ':leave',
      // here we apply a style and use the animate function to apply the style over 0.3 seconds
      [style({opacity: 1}), animate('0.5s', style({opacity: 0}))],
      {optional: true},
    ),
    query(
      ':enter',
      [style({opacity: 0}), animate('0.5s', style({
        // translateX: '300px',
        opacity: 1,
      }))],
      {optional: true},
    ),
  ]),
]);
export const moveAnim = trigger('moveAnim',
  [
    /*state('in',
      // style({transform: 'translate(500px)'}), {
      style({
        backgroundColor: '{{col}}',
        opacity:'0.2',
        right: '{{pos}}px'
      }), {
        params: {pos: '0',col:'*'},
      },
    ),*/
    state('in',
      // style({transform: 'translate({{pos}},-300px)'}), {
      style({
        // position: 'fixed',
        backgroundColor: '{{col}}',
        // opacity:'0.2',
        right: '{{pos}}px',
        // top: '0px',
        // width: '100%',
        // height: '100%',
      }), {
        params: {pos: '0',col:'*'},
      },
    ),state('hidden',
    // style({transform: 'translate({{pos}},-300px)'}), {
    style({
      // position: 'fixed',
      backgroundColor: '{{col}}',
      right: '{{pos}}px',
      // top: '0px',
      // width: '100%',
      // height: '100%',
    }), {
      params: {pos: '0',col:'*'},
    },
    ,state('move',
    // style({transform: 'translate({{pos}},-300px)'}), {
    style({
      // position: 'fixed',
      backgroundColor: '{{col}}',
      right: '{{pos}}px',
      // top: '0px',
      // width: '100%',
      // height: '100%',
    }), {
      params: {pos: '0',col:'*'},
    },
  ),
    transition('* <=> *', animate('2000ms ease'))
  ]
);
export const slideIn = trigger('slideIn', [
  /* state('open', style({
     // right: '{{pos}}%',
     right: '300px',
   }), {
     params: {
       pos: '0',
     },
   }),
   transition('* => *', animate('2000ms ease-in')),*/
  state('open', style({
    right: '{{pos}}',
  }), {params: {pos: '0px'}}),
  transition('* <=> *', animate('0.5s ease')),
]);
/*trigger('expandCollapse',[
  state('collapsed', style({
    height: '{{min_height}}',
  }), {params: {min_height: '3em'}}),
  state('expanded', style({
    height: AUTO_STYLE
  })),
  transition('collapsed <=> expanded', animate('0.5s ease'))
])*/

export const moveAnimation = trigger('moveAnimation', [
    // The '* => *' will trigger the animation to change between any two states
    transition('* => *', [
        // The query function has three params.
        // First is the event, so this will apply on entering or when the element is added to the DOM.
        // Second is a list of styles or animations to apply.
        // Third we add a config object with optional set to true, this is to signal
        // angular that the animation may not apply as it may or may not be in the DOM.
        query(
          ':enter',
          [
            style({
              height: '{{min_height}}',
            }), {params: {min_height: '3em'}})

      ],
      {optional: true},
    ),
    query(
      ':leave',
      // here we apply a style and use the animate function to apply the style over 0.3 seconds
      [style({opacity: 1}), animate('0.75s', style({opacity: 0}))],
      {optional: true},
    ),
    query(
      ':enter',
      [style({opacity: 0}), animate('0.75s', style({opacity: 1}))],
      {optional: true},
    ),
  ]),
  ];
)
;

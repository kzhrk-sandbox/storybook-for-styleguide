import { configure, addDecorator, addParameters } from '@storybook/html';
import { withNotes } from '@storybook/addon-notes';

function loadStories () {
  require('../stories');
}

addParameters({
  options: {
    hierarchyRootSeparator: '|',
    hierarchySeparator: /\/|\./,
  },
});
addDecorator(withNotes);
configure(loadStories, module);

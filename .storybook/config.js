import { configure, addDecorator } from '@storybook/html';
import { withNotes } from '@storybook/addon-notes';

function loadStories () {
  require('../stories');
}

addDecorator(withNotes);
configure(loadStories, module);

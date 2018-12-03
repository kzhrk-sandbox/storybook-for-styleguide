import { storiesOf } from '@storybook/html';
import iconTemplate from '../../../src/pug/component/sectionhead/icon';
import * as description from './description';

storiesOf('sectionhead', module)
  .add('アイコン付き見出し', () => {
    return iconTemplate();
  }, {
    notes: {
      markdown: description.icon
    }
  })


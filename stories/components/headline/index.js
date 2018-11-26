import { storiesOf } from '@storybook/html';
import priorityTemplate from '../../../src/pug/components/headline/index';
import iconTemplate from '../../../src/pug/components/headline/icon';
import * as description from './description';

storiesOf('Headline', module)
  .add('見出し', () => priorityTemplate(), {
    notes: {
      markdown: description.index
    }
  })
  .add('アイコン付き見出し', () => iconTemplate(), {
    notes: {
      markdown: description.icon
    }
  })


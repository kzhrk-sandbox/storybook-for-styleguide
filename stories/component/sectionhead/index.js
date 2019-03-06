import { storiesOf } from '@storybook/html';
import iconTemplate from '../../../src/pug/component/sectionhead/icon';
import * as description from './description';

storiesOf('list リスト', module)
  .add('icon', () => {
    return iconTemplate();
  }, {
    notes: {
      markdown: description.icon
    }
  })


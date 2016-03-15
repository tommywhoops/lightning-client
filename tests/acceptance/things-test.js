import { test } from 'qunit';
import moduleForAcceptance from 'lightning-client/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | things');

test('visiting /things', function(assert) {
  visit('/things');

  andThen(function() {
    assert.equal(currentURL(), '/things');
    assert.equal(find('p:first').text(), 'Test Thing Record');
  });
});

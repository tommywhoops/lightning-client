import { test } from 'qunit';
import moduleForAcceptance from 'lightning-client/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | things');

test('visiting /things renders the thing template', function(assert) {
  visit('/things');

  andThen(function() {
    assert.equal(find('h1:first').text(), 'Here are the things!');
  });
});

test('visiting /things lists the things', function(assert) {
  visit('/things');

  andThen(function() {
    assert.equal(find('p:first').text(), 'Seed Thing 1');
  });
});

test('visiting /things lists 10 things', function(assert) {
  visit('/things');

  andThen(function() {
    assert.equal(find('p').length, 10);
  });
});

import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({
  model () {
    return this.store.findAll('thing');
  }
});
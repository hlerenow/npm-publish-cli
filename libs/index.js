console.log(process.env);
export default {
  a: function a() {
    console.log('I\'m a');
  },
  b: function b() {
    console.log('I\'m b');
  },
  version: process.env._VERSION_
};
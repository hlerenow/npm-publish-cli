console.log(process.env);

export default {
    a: function() {
        console.log('I\'m a');
    },
    b: function() {
        console.log('I\'m b');
    },
    version: process.env._VERSION_
};

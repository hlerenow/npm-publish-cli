console.log(process.env);

export default {
    a: async function() {
        console.log('I\'m a');
        await (new Promise((resolve, reject) => {
            resolve();
        }));
    },
    b: function() {
        console.log('I\'m b');
    },
    version: process.env._VERSION_
};

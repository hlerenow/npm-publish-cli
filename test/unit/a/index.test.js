function a() {
    return 1;
}

describe('add unit test.', function() {
    it('2 + 3 = 5', function() {
        console.log(localStorage.setItem('a', 123));
        console.log(localStorage.getItem('a'));
        expect(a()).to.be.equal(1);
    });
});

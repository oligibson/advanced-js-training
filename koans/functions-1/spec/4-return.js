/*jslint nomen: true*/
/*global describe, expect, it, __*/
describe('return', function () {
	it('1 - should understand return', function () {
		var Samurai = function (name) {
			this.name = name;
		}, samurai = new Samurai('Myamoto');
		expect(Samurai('Myamoto')).toBe(undefined);
		expect(samurai.name).toBe('Myamoto');
		expect(samurai instanceof Samurai).toBe(true);
		expect(samurai.constructor).toBe(Samurai);
	});
	it('2 - should understand return', function () {
		var Samurai = function (name) {
			this.name = name;
			return 1;//also try with 0, true, false, "string", null, undefined
		}, samurai = new Samurai('Myamoto');
		expect(samurai.name).toBe('Myamoto');
		expect(samurai instanceof Samurai).toBe(true);
		expect(samurai.constructor).toBe(Samurai);
	});
	it('3 - should understand return', function () {
		var Samurai = function (name) {
			return {
				name: name
			};
		}, samurai = new Samurai('Myamoto');
		expect(samurai.name).toBe('Myamoto');
		expect(samurai instanceof Samurai).toBe(false);
		expect(samurai.constructor).toBe(Object);
	});
	it('4 - should understand return', function () {
		var Samurai = function (name) {
			this.name = name;
		}, samurai1 = new Samurai('Myamoto'), samurai2 = new Samurai('Myamoto');
		expect(samurai1 instanceof Samurai).toBe(true);
		expect(samurai1.name).toBe('Myamoto');
		expect(samurai2 instanceof Samurai).toBe(true);
		expect(samurai2.name).toBe('Myamoto');
	});
});

QUnit.module( "group c", {
	beforeEach: function( assert ) {
		assert.ok( true, "one extra assert per test" );
	}, afterEach: function( assert ) {
		assert.ok( true, "and one extra assert after each test" );
	}
});
QUnit.test( "another test", function( assert ) {
  assert.ok( 1 == "1", "Again 1 and string 1" );
});
QUnit.test( "not actually a test", function( assert ) {
  assert.ok( 1 == "1", "Getting tired of 1 and string 1" );
});
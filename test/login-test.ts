import {test, module} from "../node_modules/qunit";

module("Login and -out tests", function () {
    test("Can put two and two together", function (t: any) {

        const result = 2 + 2;

        t.strictEqual(result, 4, "should put 2 and 2 together");
    });
});


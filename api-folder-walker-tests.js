// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by api-folder-walker.js.
import { name as packageName } from "meteor/kschingiz:api-folder-walker";

// Write your tests here!
// Here is an example.
Tinytest.add('api-folder-walker - example', function (test) {
  test.equal(packageName, "api-folder-walker");
});

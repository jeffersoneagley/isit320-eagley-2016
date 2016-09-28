# GetNumbersTest

This assignment is an introduction to UnitTesting with Jasmine.

In this project there are two folders:

- Source
- Test

In Test is a file called **GetNumberSpec.js**. It has a number of tests in it. Your goal is to make the tests pass.

The first test will pass automatically:

```javascript
    it("proves true is true", function () {
        expect(true).toBe(true);
    });
```

This test has two parts. The first part describes the test:

    it("proves true is true", function () {
        
The second part is the test itself. It expects true to be equal to true:

    expect(true).toBe(true);

Needless to say, this test passes. You could make it fail by writing this:

    expect(true).toBe(false);
    
Another test in getNumberSpec looks like this:

```javascript
    it("shows getOne returns one", function () {
        expect(getNumbers.getOne()).toBe(1);
    });
```

It expects you to provide an object called getNumbers. That object should have a method called **getOne**. The **getOne()** method should return the value 1:

```javascript
var getNumbers;

getNumbers = {

    getOne: function () {
        'use strict';
        return 1;
    }
};
```

You should place this object in the folder called **Source**.

To test if the getOne method succeeds, go to the command prompt. One time only, enter this command:

    npm install
    
Then each time you want to run the tests, type this:

    grunt karma
    
The results should look like this:

```bash
grunt karma
Running "karma:unit" (karma) task
INFO [karma]: Karma v0.12.31 server started at http://localhost:9876/
INFO [launcher]: Starting browser PhantomJS
INFO [PhantomJS 1.9.8 (Linux)]: Connected on socket mh1x_ySCnFP6Zd3c_89W with id 67946334

  Function Basics with Require
    ✓ proves true is true
    ✓ proves getNumbers is an object
    ✗ shows getNumbers has nine methods
	Expected 1 to be 9.
	    at /home/charliecalvert/Git/prog272_calvert_2015/Week02-GetNumbers/Test/GetNumberSpec.js:19

    ✓ shows getOne returns one
    ✗ shows getTwo returns two
	TypeError: 'undefined' is not a function (evaluating 'getNumbers.getTwo()')
	    at /home/charliecalvert/Git/prog272_calvert_2015/Week02-GetNumbers/Test/GetNumberSpec.js:27

  And so on...
```

Your job is to get all the tests to pass. Here is an example of a successful run:
    
```bash
grunt karma
Running "karma:unit" (karma) task
INFO [karma]: Karma v0.12.31 server started at http://localhost:9876/
INFO [launcher]: Starting browser PhantomJS
INFO [PhantomJS 1.9.8 (Linux)]: Connected on socket pvJD88hcbGekKWvn-bpz with id 61967173

  Function Basics with Require
    ✓ proves true is true
    ✓ proves getNumbers is an object
    ✓ shows getNumbers has nine methods
    ✓ shows getOne returns one
    ✓ shows getTwo returns two
    ✓ shows getThree returns three
    ✓ shows getFour returns four
    ✓ shows getFive returns five
    ✓ shows getSix returns six
    ✓ shows getSeven returns seven
    ✓ shows getEight returns eight
    ✓ shows getNine returns nine

PhantomJS 1.9.8 (Linux): Executed 12 of 12 SUCCESS (0.002 secs / 0.001 secs)
```

You might find it useful to run karma in interactive mode. Type **karma start** at the command line. Now, each time you edit **GetNumbers.js**, the tests will be run automatically. Watch the command line to see the magic at work.

To get the tests to pass, you should only change **GetNumbers.js**. Don't ever change **GetNumbersSpec.js**. That is cheating.

##JsHint

Getting your tests to pass is one part of a developers job. The other part is making sure the syntax and formatting in your files is correct. To help with this task, you can use **jshint.**. 

Suppose we did something foolish like forget to add **use strict** to one of your methods:

If we were to make such a egregious blunder, this is what would happen when you ran **jshint**:

```bash
grunt jshint
Running "jshint:files" (jshint) task
>> Report "result.xml" created.
Warning: Task "jshint:files" failed. Use --force to continue.

Aborted due to warnings.
```

If we opened up **result.xml** we would see this:

```xml
<?xml version="1.0" encoding="utf-8"?>
<checkstyle version="4.3">
	<file name="Source/GetNumber.js">
		<error line="7" column="9" severity="error" message="Missing &quot;use strict&quot; statement." source="jshint.E007" />
	</file>
</checkstyle>
```

As you can see, **jshint** is upset because we have left out a **'use strict';** on line 7 of our source code. 

The simplest way to view the **results.xml** file is in a browser:

    firefox result.xml
    
## Turn it in

Make sure that in the root of your repository you have a file called .gitignore. It should include, at minimum, the following line:

    node_modules

Make sure your JsHint and unit tests all pass. To double check, type the following in the root folder for your project:

    grunt test
    
Put your work in your repository in a folder called **Week02-GetNumbers**. Check it in. When you submit the assignment, use the text area to remind me of the url of your repository. It should look something like this:

    git@bitbucket.org:lastname/prog272_lastname.git
    
But of course it won't be exactly like that, for obvious reasons.

## Hints

In general, it is very important that you get things right. Don't:

- forget your .gitignore file in the root folder of your repository
- forget to remind me of the url of your repository
- get the casing wrong on the folder name. For instance, don't write something like:
    - week02_GetNumbers // Wrong case on w
    - Week02_GetNumbers // Underscore instead of dash
    - GetNumbers // Week missing
    - And on and on.

References:

- <http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptObjects.html>

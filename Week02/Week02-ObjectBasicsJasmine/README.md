# Objects Basics

Learn the basic facts about constructing objects in JavaScript.

This project shows how to run mocha for unit testing and jshint
for checking the syntax of your code.

To run this project, do one of the two things:

- Use mocha: **./RunMocha**
- Use npm: **./npm test**

In both cases mocha stays active. When you run mocha like this
in interactive mode you can edit your files and
see the results of each change. To just run and exit without
keeping **mocha** in memory do this:

	mocha Test

This command tells **mocha** that are tests are in the **Test**
directory. By default, it looks in the **test** folder.

There are numerous ways to run grunt, but the most important is:

- Just jshint: **grunt jshint**

## Global installs

You will want to install grunt and mocha globally.

If on Linux, first do this:

	npm config set prefix ~/npm
	
Then add this to your .bashrc:

	export PATH="$PATH:$HOME/npm/bin"
	
To install globally:

	npm install -g grunt-cli
	npm install -g mocha

You will still need to run **npm install** in the root
of your project. The above handles the global installs, but
there are still local installs that you need to finish.
	
Getting Started with GameBuilder
================================

Introduction
------------

We currently don't have any releases, so you'll need to check out the source via SVN.

Current Status
--------------

The JS API is still being worked on, but here are some demos:

* a [demo Go board](https://mbrukman.github.io/gamebuilder/demo/go_board.html) -
  interact via clicking
* a [demo Go game](https://mbrukman.github.io/gamebuilder/demo/go_game.html) -
  interact via clicking (does not handle captures, scoring, or passing)
* a [demo Reversi board](https://mbrukman.github.io/gamebuilder/demo/reversi_board.html) -
  interact via clicking (does not flip piece color when surrounded)
* a [chess FEN parser](https://mbrukman.github.io/gamebuilder/demo/chess_fen.html)

You can view source of those files to see how the API is used.

*Creating new files*

Each new file must have a proper copyright and license block at the top of the
file.  To make the process easier, we have a script `tools/autogen.sh` which
will generate the right boilerplate according to the file extension.  Here's
how to use it:

```bash
% tools/autogen.sh game.py > game.py
% tools/autogen.sh game_test.py > game_test.py
```

Take a look at the script to see which file types it supports.  Note that it
also adds some other boilerplate to some times of files depending on project
requirements, e.g. enabling all errors in PHP or importing the file under test
in Python unittests.

Testing
-------

*Javascript*

Set up your workspace for testing:

```bash
% cd gamebuilder
# Only do this once
% tools/setup_workspace.sh
```

* Start the webserver (default port is 8000, you can modify it with `--port` switch):
  ```
  % tools/http_server.py
  ```
* Open a JSUnit test file, e.g.
  [games_test.html](http://localhost:8000/third_party/jsunit/testRunner.html?testpage=/tests/js/games/games_test.html)
  in your browser
* Click "Run"

Repeat for any other tests you may have by modifying the path to the HTML file
in the URL or the text box. We plan to make it easier to run all Javascript
unittests in batch mode on the command line.

*Python*

```bash
% cd src/py
% make test
```

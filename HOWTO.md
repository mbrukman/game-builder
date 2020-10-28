Getting Started with GameBuilder
================================

Current Status
--------------

The JS API is still being worked on, but here are some demos:

* a [demo Go board](https://mbrukman.github.io/game-builder/demo/go_board.html) -
  interact via clicking
* a [demo Go game](https://mbrukman.github.io/game-builder/demo/go_game.html) -
  interact via clicking (does not handle captures, scoring, or passing)
* a [demo Reversi board](https://mbrukman.github.io/game-builder/demo/reversi_board.html) -
  interact via clicking (does not flip piece color when surrounded)
* a [chess FEN parser](https://mbrukman.github.io/game-builder/demo/chess_fen.html)

You can view source of those files to see how the API is used.

*Creating new files*

Each new file must have a proper copyright and license block at the top of the
file. Use the [`autogen`](https://github.com/mbrukman/autogen) tool which makes
it easy to generate boilerplate license headers for new files.

Testing
-------

*Javascript*

* Set up your workspace for testing:

  ```bash
  % cd gamebuilder
  # Only do this once
  % tools/setup_workspace.sh
  ```

* Start the webserver (default port is 8000, you can modify it with `--port` switch):

  ```bash
  % tools/http_server.py
  ```

* Open a JSUnit test file, e.g.,
  [`games_test.html`](http://localhost:8000/third_party/jsunit/testRunner.html?testpage=/tests/js/games/games_test.html),
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

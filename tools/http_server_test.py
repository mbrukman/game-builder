#!/usr/bin/python2.4
#
# Copyright 2009 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import unittest
import http_server


class TestWebServer(unittest.TestCase):

  def testIsAllowedFile(self):
    self.assertTrue(http_server.IsAllowedFile('/bar/baz/foo.html'))
    self.assertTrue(http_server.IsAllowedFile('/styles/ui.css'))
    self.assertTrue(http_server.IsAllowedFile('/code/source.js'))
    self.assertTrue(http_server.IsAllowedFile('/images/logo.gif'))
    self.assertTrue(http_server.IsAllowedFile('/images/logo.jpg'))
    self.assertTrue(http_server.IsAllowedFile('/images/logo.png'))
    self.assertFalse(http_server.IsAllowedFile('/etc/passwd'))
    self.assertFalse(http_server.IsAllowedFile('/root/.vimrc'))


if __name__ == '__main__':
  unittest.main()

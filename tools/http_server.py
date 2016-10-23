#!/usr/bin/python
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

"""A web server to serve very few files to localhost for JsUnit testing.

Firefox 3+ has a security policy that prevents local files from accessing other
files.  This causes files that are further apart than parent/child directories
to not be able to access each other, preventing Javascript files from being
loaded properly, causing errors or hangs in JsUnit.

There are several solutions, none of which are without obvious drawbacks:

  * place all Javascript unittests within the JsUnit source tree
  * change the Firefox security policy to allow full access to all files

Instead, we run a simple webserver that serves files to the developer for the
purposes of running JsUnit tests.  By specifying 127.0.0.1 in the HTTPServer
constructor, we limit requests to only localhost.  We further set a document
root, which prevents adversaries from reading user's files by walking up the
directory tree.  We don't differentiate between 'File not found' and 'Forbidden'
to avoid giving away information as to which files exist.  We further limit the
access to only the minimal set of files for working with JsUnit and GameBuilder,
instead of using the 'mimetypes' module and serving all sorts of files that may
be in the user's tree.

Further reading:

  * http://kb.mozillazine.org/Security.fileuri.strict_origin_policy
"""

import os
import re
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
from optparse import OptionParser
from urlparse import urlparse

parser = OptionParser()
parser.add_option('-p', '--port', dest='port', default=8000,
                  help='port to run on')
parser.add_option('', '--document_root', dest='document_root',
                  default=os.getcwd(),
                  help='document root for requests')
(options, args) = parser.parse_args()


MIME_TYPES = {
  'css'  : 'text/css',
  'gif'  : 'image/gif',
  'html' : 'text/html',
  'jpg'  : 'image/jpg',
  'js'   : 'application/x-javascript',
  'png'  : 'image/png',
}

FILE_EXTENSION_RE = re.compile(r'\.([^\.]+)$')


def IsAllowedFile(path):
  return GetMimeType(path) != None


def GetMimeType(path):
  match = FILE_EXTENSION_RE.search(path)
  if not match:
    return None
  ext = match.group(1)
  if MIME_TYPES.has_key(ext):
    return MIME_TYPES[ext]
  else:
    return None


def ReadBinaryFileToStream(path, stream):
  CHUNK_SIZE = 4096
  file = open(path, 'rb')
  while True:
    chunk = file.read(CHUNK_SIZE)
    stream.write(chunk)
    # We should be reading a full CHUNK_SIZE, unless we've reached the end of
    # the file, in which case we're done.
    if len(chunk) < CHUNK_SIZE:
      break
  file.close()


class RequestHandler(BaseHTTPRequestHandler):
  def RespondWithNotFound(self):
    self.send_response(404)
    self.send_header('Content-type', 'text/plain')
    self.end_headers()
    self.wfile.write('File not found')

  def do_GET(self):
    # urlparse() returns a tuple (scheme, netloc, path, params, query, fragment).
    # In Python 2.5+, we can use named attributes, but in versions prior to
    # that, only numerical indexes are supported.
    url = urlparse(self.path)
    joined_path = os.sep.join([options.document_root, url[2]])
    real_path = os.path.realpath(joined_path)
    if real_path.find(options.document_root) != 0 or \
        not os.path.exists(real_path) or \
        not os.path.isfile(real_path) or \
        not IsAllowedFile(real_path):
      # For security purposes, we don't differentiate between 404 (Not found)
      # vs. 403 (Forbidden) as that might tell the adversary what files exist.
      self.RespondWithNotFound()
      return

    self.send_response(200)
    self.send_header('Content-type', GetMimeType(real_path))
    self.end_headers()
    ReadBinaryFileToStream(real_path, self.wfile)


def main():
  try:
    # Only allow connections from localhost to minimize exposure.
    server = HTTPServer(('127.0.0.1', options.port), RequestHandler)
    server.serve_forever()
  except KeyboardInterrupt:
    server.socket.close()


if __name__ == '__main__':
    main()

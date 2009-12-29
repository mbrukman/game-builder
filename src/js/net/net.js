// Copyright 2009 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

gamebuilder.net = {};

/**
 * A cross-browser implementation of XMLHttpRequest.
 *
 * @return {XMLHttpRequest} an XMLHttpRequest object if this browser supports
 *     it; otherwise, throws an exception.
 */
gamebuilder.net.xmlHttpRequest = function() {
  try {
    // Recent versions of browsers support this method.
    return new XMLHttpRequest();
  } catch (e) {
    // Older versions of IE use an ActiveX implementation.
    var MS_XML_HTTP = [ 'Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.3.0',
                        'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP' ];
    for (var i = 0; i < MS_XML_HTTP.length; ++i) {
      try {
        return new ActiveXObject(MS_XML_HTTP[i]);
      } catch (e) {
        // No-op, will try the next version on the next iteration.
      }
    }
  }
  throw new Error('This browser does not support XMLHttpRequest');
};

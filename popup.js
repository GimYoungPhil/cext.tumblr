// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Global variable containing the query we'd like to pass to Flickr. In this
 * case, kittens!
 *
 * @type {string}
 */
var PhotoGenerator = {
  /**
   * Flickr URL that will give us lots and lots of whatever we're looking for.
   *
   * See http://www.flickr.com/services/api/flickr.photos.search.html for
   * details about the construction of this URL.
   *
   * @type {string}
   * @private
   */

  tumblr_: 'http://api.tumblr.com/v2/blog/n-i-c-e-d-r-e-a-m.tumblr.com/posts/photo?' +
           'api_key=' + 'rM6YqOaqy7HEizZNzLEGZYtTEgIB3Vc65zrlom2qyEPJV775gs',

  book_: 'http://m.kyobobook.com/booklog/reviews/KOR/9791185502076?size=10&_=1421371393574',

  /**
   * Sends an XHR GET request to grab photos of lots and lots of kittens. The
   * XHR's 'onload' event is hooks up to the 'showPhotos_' method.
   *
   * @public
   */
  requestPosts: function() {
    var req = new XMLHttpRequest();
    req.open("GET", this.tumblr_, true);
    req.onload = this.showPhotos_.bind(this);
    req.send(null);
  },


  /**
   * Handle the 'onload' event of our kitten XHR request, generated in
   * 'requestPosts', by generating 'img' elements, and stuffing them into
   * the document for display.
   *
   * @param {ProgressEvent} e The XHR ProgressEvent.
   * @private
   */
  showPhotos_: function (e) {
    var results = JSON.parse(e.target.responseText);
    console.log(results);

    var posts = results['response']['posts'];
    for (var i = 0; i < posts.length; i++) {
      var img = document.createElement('img');
      img.src = this.constructPhotoURL_(posts[i]);
      document.body.appendChild(img);
    }
  },

  constructPhotoURL_: function(post) {
    // console.log(photos);
    return post['photos'][0]['alt_sizes'][0]['url'];
  },

  /**
   * Given a photo, construct a URL using the method outlined at
   * http://www.flickr.com/services/api/misc.urlKittenl
   *
   * @param {DOMElement} A kitten.
   * @return {string} The kitten's URL.
   * @private
   */
  constructKittenURL_: function (photo) {
    return "http://farm" + photo.getAttribute("farm") +
        ".static.flickr.com/" + photo.getAttribute("server") +
        "/" + photo.getAttribute("id") +
        "_" + photo.getAttribute("secret") +
        "_s.jpg";
  }
};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  PhotoGenerator.requestPosts();
});

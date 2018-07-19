import axios from 'axios'
const parseString = require('xml2js').parseString;
const http = require("http");

//use MuseScore API

const consumerKey = "857nCx8SQ5BVePHGiDKUyJnHjzBzAYKK";
// ConsumerSecret: W2EG6GMEV9Nzt9jipGLkXr5c8vkzVLAu

export const getMuseScoreData = (searchText, callback)=> {

  var url = `http://api.musescore.com/services/rest/score.xml?oauth_consumer_key=${consumerKey}&text=${searchText}&sort=relevance`;

  var req = http.get(url, function(res) {
    var xml = '';


    res.on('data', function(chunk) {
      xml += chunk;
    });

    res.on('error', function(e) {
      callback(e, null);
    });

    res.on('timeout', function(e) {
      callback(e, null);
    });


    res.on('end', function() {
      parseString(xml, function(err, result) {
        callback(null, result);


      });
    });
  });
};


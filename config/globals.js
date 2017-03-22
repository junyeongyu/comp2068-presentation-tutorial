/**
 * Created by RFreeman on 2/8/2017.
 */

// array of global variables
module.exports = {
	db: 'root:abcd@ds139949.mlab.com:39949/junyeong', // remode mongodb
    facebook: {
    	clientID: '670670809797414',
    	clientSecret: '75a2d602dab852f03125468362906a22',
    	callbackURL: 'http://localhost:3000/facebook/callback'
    },
    google: {
    	clientID: '87966041696-v72ea3aspp2a8sg4crv7npvup16oiflr.apps.googleusercontent.com',
    	clientSecret: 'x_n1iF21HeXG1h1UUhgqgsR8',
    	callbackURL: 'http://localhost:3000/google/callback'
    }

};

## Restful API with Mongoose & Express & React & mocha

This is simple CRUD for user preferences using Node.js, MongoDB and React.

## Requirements
* Node.js v8.2.1
* MongoDB v3.4.6

## Prerequisite

* pure ES6/7 and Node.js 8.x
* React/InfernoJS
* Express
* MongoDB
* Async/Await
* Session handling
* Test with mocha and chai

###### ... install
```
$ npm install
... for data installation and basic backend api test
$ npm test  
$ npm run-script start
```

## API List
| ROUTE                     | METHOD | DESCRIPTION                        |
|---------------------------|--------|------------------------------------|
| /users                    | GET    | get all the users                  |
| /users/:user_id           | GET    | get user and session info by _id   |
| /users/                   | POST   | create user                        |
| /users/                   | DELETE | delete user by user session        |
| /preferences              | GET    | get preferences by user session    |
| /preferences              | POST   | create preferences by user session |
| /preferences              | PUT    | update preferences by user session |
| /preferences              | DELETE | delete preferences by user session |

## User and Preferences JSON Format
```json
{
    "user_name": "JK Jung",
    "location": "Seoul",
    "content": {
        "category_lists":"enable"
    },
    "privacy": {
      "profile_visibility": "everyone",
      "messages": "everyone"
    },
    "localization": {
      "language": "한국어",
      "time_zone": "Asia/Seoul",
      "currency": "KRW"
    }
}
```
###### ... todo

* Add basic front-end test

###### ... issues

* solved all the issues

###### ... reference
* node.js+mongoose+es6: https://velopert.com/594
* mocha+chai+supertest: http://chaijs.com/api/bdd/  https://www.npmjs.com/package/supertest
* express-session: https://github.com/expressjs/session
* pure es6/7 check: http://es6-features.org/#Constants
* react: https://facebook.github.io/react/docs/rendering-elements.html
* font-awesome: http://fontawesome.io/3.2.1/examples/
* materialize: http://materializecss.com/
* google font: https://fonts.google.com/

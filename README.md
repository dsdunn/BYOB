# BYOB

This project is a RESTful api serving information about breweries located in Denver and the beers they produce.

## Getting Started

Clone down this repo and install the dependencies. 

### Prerequisites

This project is build with Express.js and Knex.js, and tested with Mocha, Chai, and chai-http. Other dependencies include body-parser and jsonwebtoken.

```
npm install 
```

### Running the tests
To run tests, run `npm test` in the command line.

### Deployment

This app is live at https://byobrew.herokuapp.com/.


# API reference

## Login

Used to collect a Token for a registered User.

**URL** : `/api/jwt`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "email": "[valid email address @turing.io]",
    "name": "[name]"
}
```

### Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "token": "93144b288eb1fdccbe46d6fc0f241a51766ecd3d"
}
```

### Error Response

**Condition** : If 'email' and/or 'name' parameters are missing.

**Code** : `422 Unprocessable Entity`

**Content** :

```string
"Missing params: [param]"
```



## Authors

* **David Starr Dunn** - *Initial work* - [Github](https://github.com/dsdunn)
* **Austin Wiedenman** - *Initial work* - [Github](https://github.com/Awiedenman)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* this project was built as part of the coursework for Turing School of Software and Design's Front-End Engineering program.


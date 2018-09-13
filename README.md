# BYOB

This project is a RESTful api serving information about breweries located in Denver and the beers they produce. It was built in one week as part of the coursework for Turing School of Software and Design's Front-End Engineering program.

## Authors

* **David Starr Dunn** - *Initial work* - [@dsdunn](https://github.com/dsdunn)
* **Austin Wiedenman** - *Initial work* - [@awiedenman](https://github.com/Awiedenman)


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

## Collect a Token for a User.

**URL** : `/api/v1/jwt`

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

```
"Missing params: [param]"
```

## GET all breweries

**URL** : `/api/v1/breweries`

**Method** : `GET`

**Auth required** : NO

**Data constraints**

No Data constraints.  No Auth required.

### Success Response

**Code** : `200 OK`

**Content example**

```json
    [
    {
        "id": 1,
        "brewery_name": "Alternation Brewing Company",
        "address": "1539 S Broadway\t\nDenver, CO\t80210\t",
        "visited": false,
        "rating": null,
        "created_at": "2018-09-02T15:57:32.646Z",
        "updated_at": "2018-09-02T15:57:32.646Z"
    },
    {
        "id": 3,
        "brewery_name": "Alpine Dog Brewing Company",
        "address": "1505 Ogden St.\t\nDenver, CO\t80218\t",
        "visited": false,
        "rating": null,
        "created_at": "2018-09-02T15:57:32.648Z",
        "updated_at": "2018-09-02T15:57:32.648Z"
    }
]
```

### Error Response

**Condition** : No breweries found.

**Code** : `404 Not Found`

**Content** :

```
“No breweries found”
```
**Condition** : Unable to process user’s request.

**Code** : `500 Internal Server Error`

**Content** :

string
“Sorry, trouble on our end handling your brewery request”.

## GET all beers

**URL** : `/api/v1/beers`

**Method** : `GET`

**Auth required** : NO

**Data constraints**

No Data constraints.  No Auth required.

### Success Response

**Code** : `200 OK`

**Content example**

```json
    [{
        "id": 2,
        "brewery_id": 4,
        "beer_name": "Blackberry Table Sour",
        "style": "Berliner Weissbier",
        "abv": null,
        "tasted": false,
        "rating": null,
        "availability": "Rotating",
        "created_at": "2018-09-02T15:57:32.780Z",
        "updated_at": "2018-09-02T15:57:32.780Z"
    },
    {
        "id": 3,
        "brewery_id": 4,
        "beer_name": "Baere: Stout",
        "style": "American Stout",
        "abv": 6.5,
        "tasted": false,
        "rating": null,
        "availability": "Rotating",
        "created_at": "2018-09-02T15:57:32.784Z",
        "updated_at": "2018-09-02T15:57:32.784Z"
    }]
```

### Error Response

**Condition** : No beers found.

**Code** : `404 Not Found`

**Content** :

```
“No breweries found”
```
**Condition** : Unable to process user’s request.

**Code** : `500 Internal Server Error`

**Content** :


“Sorry, trouble on our end handling your Beer request” + “error.message”

## GET beer by beerName

**URL** : `/api/v1/beers/:beerName`

**Method** : `GET`

**Auth required** : NO

**Data constraints**

No Data constraints.  No Auth required.

### Success Response

**Code** : `200 OK`

**Content example**
*endpoint: `“/api/v1/beers/Boise 150”`*
```json:
    [{
        "id": 105,
        "brewery_id": 2,
        "beer_name": "Boise 150",
        "style": "Golden or Blonde Ale",
        "abv": 4.7,
        "tasted": false,
        "rating": null,
        "availability": "Rotating",
        "created_at": "2018-09-02T15:57:32.871Z",
        "updated_at": "2018-09-02T15:57:32.871Z"
    }
]
```

### Error Response

**Condition** : Beer not found

**Code** : `404 Not Found`

**Content** :

```
“No breweries found”
```
**Condition** : Unable to process user’s request.

**Code** : `500 Internal Server Error`

**Content** :

“Sorry, trouble on our end handling your beer request” + “error.message”.

## GET brewery by breweryName

**URL** : `/api/v1/beers/:breweryName`

**Method** : `GET`

**Auth required** : NO

**Data constraints**

No Data constraints.  No Auth required.

### Success Response

**Code** : `200 OK`

**Content example**
*`endpoint: “/api/v1/beers/Chain Reaction Brewing”`*
```json:
    [{
        "id": 21,
        "brewery_name": "Chain Reaction Brewing",
        "address": "902 S Lipan St.\t\nDenver, CO\t80223\t",
        "visited": false,
        "rating": null,
        "created_at": "2018-09-02T15:57:32.669Z",
        "updated_at": "2018-09-02T15:57:32.669Z"
    }]
 ```

### Error Response

**Condition** : Brewery not found

**Code** : `404 Not Found`

**Content** :

```
“No breweries found”
```
**Condition** : Unable to process user’s request.

**Code** : `500 Internal Server Error`

**Content** :

```
“Sorry, trouble on our end handling your request” + “error.message”.
```

## GET beers with a rating higher than a given user input

**URL** : `/api/v1/rating?rating=[integer 1-5]`

**Method** : `GET`

**Auth required** : NO

**Data constraints**

No Data constraints.  No Auth required.

### Success Response

**Code** : `200 OK`

**Content example**
*endpoint: `“/api/v1/rating?=3”`*
```json:
   [{
        "id": 2,
        "brewery_id": 4,
        "beer_name": "Blackberry Table Sour",
        "style": "Berliner Weissbier",
        "abv": null,
        "tasted": false,
        "rating": 4,
        "availability": "Rotating",
        "created_at": "2018-09-02T15:57:32.780Z",
        "updated_at": "2018-09-02T15:57:32.780Z"
    },
    {
        "id": 3,
        "brewery_id": 4,
        "beer_name": "Baere: Stout",
        "style": "American Stout",
        "abv": 6.5,
        "tasted": false,
        "rating": 5,
        "availability": "Rotating",
        "created_at": "2018-09-02T15:57:32.784Z",
        "updated_at": "2018-09-02T15:57:32.784Z"
    }]
```

## Add a Beer to the Database

**URL** : `/api/v1/beers`

**Method** : `POST`

**Auth required** : Yes

**Data constraints**

*required params:* "beer_name" and "brewery_name"

```json
{
    "beer_name": "[name of beer]",
    "brewery_name": "[name of brewery]",
    "style": "[style of beer]",
    "abv": "[alcohol by volume level]",
    "tasted": "[true/false]",
    "rating": "[number between 1 and 5]",
    "availability": "[seasonal/year-round]"
}
```
**Data Example**
```json
{
    "beer_name": "Dave's Delight",
    "brewery_name": "Spangalang",
    "style": "Golden Ale",
    "abv": "4.5",
    "tasted": "true",
    "rating": "5",
    "availability": "seasonal"
}
```

### Success Response

**Code** : `201 Created`

**Content example**
*id of addend beer*

```json
[1448]
```

### Error Response

**Condition** : If 'beer_name' and/or 'brewery_name' parameters are missing.

**Code** : `422 Unprocessable Entity`

**Content** :

```string
"Missing params: [param]"
```

## Add a Brewery to the Database

**URL** : `/api/v1/breweries`

**Method** : `POST`

**Auth required** : Yes

**Data constraints**

*required params:* "brewery_name", "address", "visited", "rating"

```json
{
    "brewery_name": "[name of brewery]",
    "address": "[location]",
    "visited": "[true/false]",
    "rating": "[integer between 1 and 5]"
}
```
**Data Example**
```json
{
    "brewery_name": "[Austins Brewhaus]",
    "address": "123 MyStreet, Denver 80223",
    "visited": "true",
    "rating": "5"
}
```

### Success Response

**Code** : `201 Created`

**Content example**
*id of addend beer*

```json
"New Brewery "Austin's Brewhaus has been added to the database."
```

### Error Response

**Condition** : If parameters are missing.

**Code** : `422 Unprocessable Entity`

**Content** :

```string
"Missing params: [param]"
```

## Rate a beer

**URL** : `/api/v1/beers`

**Method** : `PATCH`

**Auth required** : Yes

**Data constraints**

*required params:* "beer_name", "rating"

```json
{
    "beer_name": "[name of brewery]",
    "rating": "[integer between 1 and 5]"
}
```
**Data Example**
```json
{
    "beer_name": "Leta's Stout",
    "rating": "5"
}
```

### Success Response

**Code** : `201 Created`

**Content example**

```json
"You have set the rating of 'Leta's Stout' to 5."
```

### Error Response

**Condition** : If parameters are missing.

**Code** : `422 Unprocessable Entity`

**Content** :

```string
"Missing params: [param]"
```

## Log a Brewery Vist

**URL** : `/api/v1/breweries`

**Method** : `PATCH`

**Auth required** : Yes

**Data constraints**

*required params:* "brewery_name", "visited"

```json
{
    "brewery_name": "[name of brewery]",
    "visited": "true/false"
}
```
**Data Example**
```json
{
    "brewery_name": "Mile High Brewery",
    "visited": "true"
}
```

### Success Response

**Code** : `201 Created`

**Content example**

```json
"You have set the visited property of 'Mile High Brewery' to true."
```

### Error Response

**Condition** : If parameters are missing.

**Code** : `422 Unprocessable Entity`

**Content** :

```string
"Missing params: [param]"
```

## Remove a Brewery from Database

**URL** : `/api/v1/breweries/:breweryName`

**Method** : `DELETE`

**Auth required** : Yes

### Success Response

**Code** : `200 OK`

**Content example**

```json
"You have successfully Deleted '[breweryName]' from the database."
```

## Remove a Beer from Database

**URL** : `/api/v1/beers/:beerName`

**Method** : `DELETE`

**Auth required** : Yes

### Success Response

**Code** : `200 OK`

**Content example**

```json
"You have successfully Deleted '[beerName]' from the database."
```


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

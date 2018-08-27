const Nightmare = require('nightmare');
const fs = require('fs');

const nightmare = Nightmare({show: true});

let endPoints;


nightmare
  .goto('https://www.coloradobrewerylist.com/brewery_city/denver')
  .evaluate(() => {
    let breweryList = [...document.querySelectorAll('#genesis-content > brewery-list > table > tbody > tr > td > .ng-binding')]
    let breweryLinks = breweryList.map(brewery => {
      return brewery.href
    })
    return breweryLinks;
  })
  .end()
  .then(result => {
    const output = JSON.stringify(result);
    fs.writeFile('./breweryLinks.js', output, 'utf8', error => {
      if (error) {
        return console.log('Error:', error)
      }
    })
    console.log('File Saved');
  })
  .catch(err => {
    console.log("error:", err)
  })
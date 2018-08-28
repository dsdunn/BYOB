const breweryLinks = require('./breweryLinks.js');
const Nightmare = require('nightmare');
const fs = require('fs');
const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

asyncForEach(breweryLinks, async (link) => {
  let nightmare = Nightmare({show: true});

  await nightmare
    .goto(link)
    .evaluate(() => {
      const breweryName = document.querySelector('.entry-title').innerText;
      const address = document.querySelector('.more_details a').innerText;

      const rows = [...document.querySelectorAll('.beer-table tbody tr')]
      console.log(rows);
      let beers = rows.reduce((beerList, beer) => {
        let beerData = [...beer.querySelectorAll('td')]
        let beerObj = {};
        beerObj.name = beerData[0].innerText;
        beerObj.style = beerData[1].innerText;
        beerObj.abv = beerData[2].innerText;
        beerObj.availability = beerData[3].innerText;
        beerList.push(beerObj);
        return beerList;
      }, [])

      return ({
        breweryName,
        address,
        beers
      })

    })
    .end()
    .then(result => {
      const output = JSON.stringify(result, null, 2);
      fs.appendFileSync(`breweryData.js`, output + ',', 'utf8', error => {
        if(error){
          return console.log('Error:', error)
        }
      })
    })
    .catch(err => {
      console.log('Error:', err)
    })

})
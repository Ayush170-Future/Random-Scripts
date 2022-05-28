let fs = require('fs');
let axios = require('axios');
const { rejects } = require('assert');

let promises = [];
let ipfsArray = [];

promises.push(new Promise((res, ref) => {
    fs.readFile(`${__dirname}/Resume2022.pdf`, (err, data) => {
        if(err) rejects()

        console.log(data)
        
        ipfsArray.push({
            path: `pdf/CV.pdf`,
            content: data.toString('base64')
        })
        res();
    })
}))
Promise.all(promises).then( () => {
    axios.post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", 
        ipfsArray,
        {
            headers: {
                "X-API-KEY": 'KgdUo0HekrDjMCkAboGulZTASZnuVXhYnC0lHRN8d2fL1MvKtQqxYAB9bUL1sc9t',
                "Content-Type": "application/json",
                "accept": "application/json"
            }
        }
    ).then((res) => {
        console.log(res);
    }).catch((error) => {
        console.log(error)
    })
})
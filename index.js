const express  = require("express");
const app = express();

const BASE_URL = 'https://platform.antares.id:8443/~';

app.get("/trash01", async (req, res) => {
    const response = await fetch(`${BASE_URL}/antares-cse/antares-id/TrashIot/Trash-01?fu=1&ty=4&drt=1`, {
        method: "GET",
        headers: {
            "X-M2m-Origin": "2025004ac7ba5861:6c2b692e59eea2d7",
            "Content-Type": "application/json;ty=3",
            "Accept": "application/json"
          },
    })
    const responseJson = await response.json();
    const newestData = responseJson['m2m:uril'][0]
    
    const second_response = await fetch(`${BASE_URL}${newestData}`, {
        method: "GET",
        headers: {
            "X-M2m-Origin": "2025004ac7ba5861:6c2b692e59eea2d7",
            "Content-Type": "application/json;ty=3",
            "Accept": "application/json"
          },
    })
    const second_responseJson = await second_response.json();
    const output = second_responseJson['m2m:cin']['con']
    const jsonOutput = JSON.parse(output)
    console.log(typeof(jsonOutput));
    res.send(jsonOutput.data);

})

app.listen(3000, () => {
    console.log('example app listening on 3000');
});

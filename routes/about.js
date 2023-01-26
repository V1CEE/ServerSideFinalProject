const express = require('express');
const router = express.Router();

const shaked = {first_name: "Shaked", last_name: "Weis", id: "326403128",
email: "shakedwaiss@gmail.com"};

const nikita = {first_name: "Nikita", last_name: "Choiko", id: "you batul",
    email: "cock@yourmouth.com"};
router.get('/', function (req,res)
{
    res.write(JSON.stringify(shaked));
    res.write('\n\n\n');
    res.write(JSON.stringify(nikita));
    res.end();
}
);


module.exports = router;

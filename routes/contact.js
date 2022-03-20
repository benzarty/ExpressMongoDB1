var express = require('express');
var router = express.Router();
var Contact = require('../models/contact')



router.get('/', function (req, res, next) {
    Contact.find(
        (err, contacts) => {
            if(err)
            {
                console.log("erreur");
            }else {
            res.render(
                'form.twig',
                {
                    title:
                        "Contact list", cont:contacts
                }
            );}
        }
    );
});


router.get('/addform', function (req, res, next) {

    res.render(
        'add.twig',
        {
            title:
                "add Contact "
        });


});


router.post('/add', function (req, res, next) {
    new Contact({
        FullName: req.body.FullName,
        Phone: req.body.Phone
    })
        .save(
            (err, newcontact) => {
                if (err)
                    console.log("error message : " + err); 
                    else {
                    console.log(newcontact);
                    // res.json(" : Contact :" + newcontact._id + " added");
                    res.redirect("/contact")
                }
            }
        );
});

router.get('/edit/:ee', function (req, res, next) {
    //contact esm retour 
    Contact.findById(req.params.ee, (err, contact) => {
        res.render("edit.twig", { title: 'edit title', cont: contact }) //samineh cont
    })


});

router.post("/edit/:ee", function (req, res, next) {

    //par convvention _id
    Contact.exists({ _id: req.params.ee }, (err, result) => {
        if (result) {

            Contact.updateOne({ _id: req.params.ee }, { $set: req.body }, (err, data) => {
                console.log(data);
                res.redirect("/contact")
            }) //set chnowa bech yetbadel
        } else {
            res.json(result)
        }

    })


})

router.get("/delete/:id", function (req, res, next) {
    Contact.findByIdAndDelete(req.params.id, (err, result) => {
        console.log(result);
        res.redirect('/contact')
        //res.status(200).send("delete").end();
    })
})

module.exports = router;


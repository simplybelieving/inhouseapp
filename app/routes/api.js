var model = require('../models/product');
var seedFunction =require('../seed/product-seeder');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var secret = 'secret';

module.exports = function(router){


  router.post('/authenticate', function(req, res){
    model.User.findOne({ username: req.body.username}).select('password').exec(function(err, user){
      if(err) throw err;

      if(!user){
        res.json({ success: false, message: 'could not authenticate user'});
      }
      else if(user){
      var validPassword = user.comparePassword(req.body.password);
          if(!validPassword){
            res.json({ success: false, message: 'Could not authenticate password'});
          }else{
            var token = jwt.sign({username: user.username}, secret, { expiresIn: '24h'});
            res.json({ success: true, message: 'Success Pass Authentication', token: token});
          }

      }

    });

  });



  router.post('/users', function(req, res){

  var user = new model.User();

  user.username = req.body.username;
  user.password = req.body.password;
  if( req.body.username==null ||  req.body.password==null ){
    res.json({ success:false, message: 'Ensure these items are provided...'});
  }
  else{
  user.save(function(err){
     if(err){
      res.json({ success: false, message:'Item already exist!'});
    }else{
      res.json({ success: true, message:'Created!'});
    }

    });

  }
  });




  router.post('/savepricelist', function(req, res){

    var client = new model.Client();
    var today = new Date(); var check = 'CUSTOMER';


    var string= req.body.cartstring;
    var objs = JSON.parse(string); //parse string of orders into objects

    model.Client.findOne({_id:req.body.client_id}, function(err, client) {


         for(var ctr=objs.length-1; ctr>=0; ctr--){
           var pricelist = new model.Pricelist();
           var product = new model.Product();


           pricelist.type = client.type;
           pricelist._clientname = client.name;
           product.cheapest_price = objs[ctr].price;
           product.productname =objs[ctr].productname;
           pricelist.date= today;
           pricelist._productname=objs[ctr].productname;
           pricelist.price=objs[ctr].price;
           pricelist.unit=objs[ctr].unit;
           pricelist.discount=objs[ctr].discount;
           pricelist.save();
           model.Client.update({_id:req.body.client_id},{ $push: { pricelistArray:pricelist._id } }).exec();
           if(client.type=='SUPPLIER')
           model.Product.update({productname:product.productname}, {$set:{cheapest_price:product.cheapest_price}}, function(err, message) {
           });


         }


    });


   res.json({ success: true, message:'Successfully Added to Pricelist '});


  });


  router.get('/alertLoss', function(req, res){

    var doc = null;
    var docs = [];


    var cursor= model.Pricelist.aggregate([
             { $lookup:
                 {
                   from: "products",//table name
                   localField: "_productname",
                   foreignField: "productname",
                   as: "doc"
                 }
              },
              { $project : { "_productname": 1 , "price": 1, "doc.cheapest_price" : 1 } },
              { $unwind: "$doc" }
              ]).cursor({}).exec();


              cursor.each(function(error, doc) {
              console.log(doc);
              });



 });

  router.get('/viewClients', function(req, res){
     model.Client.find({}, function(err, items){
     res.json({ items: items });
   });
 });

  router.post('/clients', function(req, res){
  var client = new model.Client();

  client.name = req.body.name;
  client.tin = req.body.tin;
  client.type = req.body.type;
  client.taxable = req.body.taxable;
  client.address = req.body.address;
  if( req.body.name==null || req.body.tin==null ||  req.body.taxable==null || req.body.address==null){
    res.json({ success:false, message: 'Ensure these items are provided...'});
  }
  else{
  //product.save();
  //res.send('product created!');
    client.save(function(err){
     if(err){
      res.json({ success: false, message:'Item already exist!'});
    }else{
      res.json({ success: true, message:'Created!'});
    }

    });

  }
});


  router.post('/products', function(req, res){
  var product = new model.Product();
  product.productname = req.body.productname;
  product.productcode = req.body.productcode;
  product.description = req.body.description;
  product.producttype = req.body.producttype;
  product.cheapest_price = 1000000;//max limit
  product.imagePath = req.body.imagePath;
  if( req.body.productname==null || req.body.description==null ||  req.body.producttype==null || req.body.imagePath==null){
    res.json({ success:false, message: 'Ensure these items are provided...'});
  }
  else{
    product.save(function(err){
     if(err){
      res.json({ success: false, message:'Item already exist!'});
    }else{
      res.json({ success: true, message:'Created!'});
    }

    });

  }
});



router.post('/editPricelist', function(req, res){
 var today = new Date();
  console.log(req.body.client_type);

 //model.Product.findOne({productname:req.body.productname }, function(err, product) {

  if(req.body.client_type=='SUPPLIER')
  model.Product.update({productname:req.body.productname}, {$set:{cheapest_price:req.body.newPrice}}, function(err, message) {
     });
 //});


if(mongoose.Types.ObjectId.isValid(req.body.product_id))
  model.Pricelist.update({_id:req.body.product_id}, {$set:{price:req.body.newPrice, date:today}}, function(err, message) {
      if (err)
            res.json({ success:false, message: 'Ensure these items are provided...'});
      else
            res.json({ success:true, message: 'Read the array elements YEAH BITCH'});
  });

});



router.get('/viewPricelist/:id', function(req, res){
  var idcheck = req.params.id;
  if(mongoose.Types.ObjectId.isValid(idcheck)) {
             model.Client.findOne( { _id : idcheck }).populate('pricelistArray').exec(function (err, client){
                res.json({ client: client }); }
           )}

});

 router.get('/catalogues', function(req, res){
    model.Product.find({}, function(err, items){
    res.json({ items: items });
  });
});



  router.get('/searchlist/:id', function(req, res) {
       var checkspace = "true";
       var idcheck = req.params.id; // Assign the _id from parameters to variable

       if (/^[0-9A-Za-z]+$/.test(idcheck))
     { checkspace = "false";
         //there are only alphanumeric characters; check if there's spacebar or no. if none, checspace==false
     }

       if(mongoose.Types.ObjectId.isValid(idcheck) && checkspace=="false") {
                 model.Pricelist.find( { _id : idcheck }, function(err, pricelist) {

                    res.json({ pricelist: pricelist}); }
               )} else{

   decodeURI(idcheck);console.log(idcheck);
   model.Pricelist.find({_productname:{$regex: idcheck ,$options:"$i"}, type:'SUPPLIER'}, function(err, pricelist){
      res.json({ pricelist: pricelist });
    });
  }

       });









  return router;
}

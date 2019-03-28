var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
mongoose.Promise = require('bluebird');

var PurchaseOrderSchema = new Schema({
  user: {type: String, required: true},
  ponumber: {type: String, required: true, unique: true, lowecase:true},
  date: {type: String, required: true}
});

var UserSchema = new Schema({
  username: {type: String, required: true, unique: true, lowecase:true},
  password: {type: String, required: true}
});

UserSchema.pre('save', function(next){
var user = this;
bcrypt.hash(user.password, null, null, function(err, hash){
  user.password=hash;
  next();
  });

});

UserSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

var ProductSchema = new Schema({
  productname: {type: String, required: true, unique: true},
  cheapest_price:{type: Number, require: false},
  description: {type: String, required: true},
  productcode: {type: String, required: true},
  producttype: {type: String, required: true},
  imagePath: {type: String, required: true}
});

var PricelistSchema = new Schema({

  _productname: { type: String, require: false },
  _clientname: { type: String, require: false },
  date: { type: String, require: false },
  unit:{type: String, required: false},
  price: {type: String, required: false},
  discount: {type: Number, required: false},
  type: {type: String, required: false}
  //_email: { type: String , required: false }
});


var ClientSchema = new Schema({
  pricelistArray : [{ type: Schema.Types.ObjectId, ref: 'Pricelist' }],
  name: {type:String, required: true},
  tin: {type: String, required: true},
  taxable: {type: String, required: true},
  type: {type: String, required: true},
  address: {type: String, required: true}
});


var PurchaseOrder= mongoose.model('PurchaseOrder', PurchaseOrderSchema);
var Product= mongoose.model('Product', ProductSchema);
var Pricelist = mongoose.model('Pricelist', PricelistSchema );
var Client = mongoose.model('Client', ClientSchema);
var User = mongoose.model('User', UserSchema);

module.exports = {
    Client: Client,
    PurchaseOrder: PurchaseOrder,
    User: User,
    Pricelist: Pricelist,
    Product: Product

};

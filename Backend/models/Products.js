var mongoose = require("mongoose");
mongoose.pluralize(null);

Schema = mongoose.Schema;

var ProductSchema = mongoose.Schema;

var ProductSchemaRef = new ProductSchema({
    pname: { type: String,require:true },
    price: { type: Number,require:true  },
    quantity: {type:String,require:true },
    unit: {type:String,require:true },
    url : {type:String,require:true }
});


var ProductModel = mongoose.model("Products",ProductSchemaRef);

module.exports = ProductModel;
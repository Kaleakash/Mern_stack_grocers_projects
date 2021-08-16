const mongoose = require('mongoose');
mongoose.pluralize(null);
Schema = mongoose.Schema;
var OrderSchema = mongoose.Schema;
var OrdersSchemaRef = new OrderSchema({
    id: { type: String },
    orderDetails: {type: Array},
    emailId: { type: String },
    orderDate: {type:Date},
    totalAmount: { type: Number }
});

var OrdersModel = mongoose.model("Orders",OrdersSchemaRef);
module.exports = OrdersModel;








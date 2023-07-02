const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = mongoose.model('User');
const Order = mongoose.model('Order');
const ObjectId = mongoose.Types.ObjectId;


// placeorder function takes a number of argument from frontend and create a
// document in test databases in a collection named user
router.post('/placeorder', (req, res) => {
    // User.findOne({_id:req.body.id})
    // .then((savedUser)=>{

    // })
    const order_name = req.body.order_name;
    const order_quantity = req.body.order_quantity;
    const ordered_by = req.body.id;
    const order_address = req.body.address;
    const order_city = req.body.city;
    const order_temp = new Order({
        order_name,order_quantity,order_live:true,
        order_status:"ordered", order_address, order_city, ordered_by
    })
    order_temp.save()
        .then(orderData => {
            const user = User.findOne({_id:ordered_by})
            User.updateOne({ email: user.email }, { $push: { orders_placed: orderData._id } })
                .then(userData => {
                    console.log(userData)
                    return res.json({ message: "order is placed successfully" })
                })
    })
})

// fullfillorder gets ord_id and usr_id where order id is ord_id and user with user id
// value usr_id fullfills the order
//router.post('/fullfillorder', (req, res) => {
//    const { ord_id, usr_id } = req.body
//    User.updateOne({ _id: usr_id }, { $push: { orders_fulfilled: ord_id } })
//        .then(userData => {
//            Order.updateOne({ _id: ord_id }, { order_live: false })
//                .then(orderData => {
//                    return res.json({ message: "order fulfilled successfully" })
//                })
//        })
//})

// allliveorders gets all documetns which are still not fullfilled
router.get('/allliveorders', (req, res) => {
    Order.find({order_live:true})
        .then(orders => {
            // console.log(orders)
            return res.json({ orders });
        })
})

// userliveorder recieves user id with value usr_id and returns all
// orders which are ordered by this user and are still live
router.post('/userliveorder', (req, res) => {
    console.log("i am in the usrliveorder api")
    const { usr_id } = req.body;
    Order.find({ ordered_by: usr_id, order_live: true })
        .then(orders => {
            console.log(orders.length)
            return res.json({ orders });
        })
})

// userdeadorder recieves all order where user id is usr_id and
// orders which are fullfilled
router.get('/userdeadorder', (req, res) => {
    const { usr_id } = req.body;
    Order.find({ ordered_by: usr_id, order_live: false })
        .then(orders => {
            return res.json({ orders });
        })
})

// userfullfilleddorder gets an user id with value fllfld_usr_id
// and returns all orders which are fullfilled by this user
router.get('/userfullfilleddorder', (req, res) => {
    const { fllfld_usr_id } = req.body;
    Order.find({ fullfilled_by: fllfld_usr_id})
        .then(orders => {
            return res.json({ orders });
        })
})

// fullfillorder gets and order id and an user id and gets the order and updates
// that order is fullfilled and status to picked fullfilled by the user 
router.post('/fullfillorder', (req, res) => {
    const { ordr_id, usr_id } = req.body;
    console.log(ordr_id+"   "+usr_id);
    Order.updateOne({ _id: ordr_id }, { order_live: false, order_status: "picked", fullfilled_by: usr_id })
    .then(User.updateOne({ _id: usr_id }, 
        {$push: { orders_fulfilled: ordr_id } }
        )
        .then(order => {
            return res.json({ message: "order fullfilled successfully" })
        }))
})

// fullfilledorder get usr_id from req and returns all orders
// which are fullfilled by this user
router.get('/fullfilledorder', (req, res) => {
    const { usr_id } = req.body;
    Order.find({ fullfilled_by: usr_id })
        .then(orders => {
            return res.json({orders})
        })
})

router.post('/deleteorder', (req, res) => {
    const { orderid } = req.body;
    console.log(orderid)
    
    async function deleteDocument() {
        try {
          await Order.deleteOne({ _id: orderid });
          return res.send('Document deleted');
        } catch (err) {
          return res.send(err);
        }
      }
      
      deleteDocument();
})

module.exports = router
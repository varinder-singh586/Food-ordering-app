const Model = require("../models");
const messages = require("../message").message.messages;
const jwt = require('jsonwebtoken');
const utility = require('../utility/utility');

async function createresturant(req) {
    let { name } = req.body;
    let oldname = await Model.resturant.findOne({ name })
    if (oldname) {
        throw messages.duplicate_name
    }
    let resturant = await Model.resturant.create(req.body);
    return resturant
}

async function createAdmin(req) {
    const { name, email, password, phone } = req.body;
    const oldUser = await Model.admin.findOne({ email });
    if (oldUser) {
        throw messages.duplicate_name;
    }
    const encryptedPassword = await utility.hashPasswordUsingBcrypt(req.body.password)
    const Admin1 = await Model.admin.create({
        name,
        phone,
        email,
        password: encryptedPassword,
    });
    return Admin1

}

async function Login(req) {
    const { email, password } = req.body;
    const login1 = await Model.admin.findOne({ email });
    if (login1 && (await utility.comparePasswordUsingBcrypt(password, login1.password))) {
        const token = jwt.sign({ id: login1._id, email }, process.env.TOKEN_KEY, { expiresIn: '1h' });
        login1.token = token;
        return login1
    }
}

async function createcategory(req) {
    let { name } = req.body
    let oldname = await Model.category.findOne(({ name: { $regex: name, $options: 'i' } }))
    if (oldname) {
        throw messages.category_allready_exist
    }
    let category = await Model.category.create(req.body)
    return category
}


async function putcategory(req) {
    let data = await Model.category.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    return data
}

async function deletecategory(req) {
    let check = await Model.products.findOne({ categoryId: req.params.id })
    if (check) {
        throw messages.category_Not_allowed_to_delete;
    }
    let check2 = await Model.category.deleteOne({ _id: req.params.id })
    return messages.category_successfully_deleted
}

async function createProduct(req) {
    let { name } = req.body
    let oldname = await Model.products.findOne({ name })
    if (oldname) {
        throw messages.Product_is_already_exist
    }
    let product = await Model.products.create(req.body)
    return product
}

async function putproduct(req) {
    let data = await Model.products.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    return data
}

async function deleteproducts(req) {
    let check = await Model.order.findOne({ productsId: req.params.id })
    if (check) {
        throw messages.product_Not_allowed_to_delete
    }
    let check2=await Model.products.deleteOne({ _id: req.params.id })
    return messages.product_successfully_deleted
}

async function orderstatus(req){
    let check = await Model.order.findOne({ _id: mongoose.Types.ObjectId(req.params.id) })
    if (req.body.status <= check.status) {
        throw messages.status_not_change
    }
    let check2 = await Model.order.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, req.body, { new: true })
    return check2
}

async function deleteuser(req){
    let user=await Model.user.deleteOne({ _id: req.params.id })
    return messages.successfully_deleted
}
module.exports = {
    createresturant,
    createAdmin,
    createcategory,
    createProduct,
    Login,
    putcategory,
    deletecategory,
    putproduct,
    deleteproducts,
    orderstatus,
    deleteuser

}



























// let admin = await Model.admin.findOne({
    //     email: data.email,
    //     phone: data.phone,
    //     userName: data.name,
    // });
    // console.log(admin)
const User = require("../models").User;
const Service = require("../models").Services;
const Comments = require("../models").Comment;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = "secretkey23456";
const ServiceRequests = require("../models").ServiceRequests;
const moment = require("moment");

exports.register = async (data) => {
    var registerData = {
        name: data.name,
        email: data.email,
        password: bcrypt.hashSync(data.password),
        type: data.type,
        gender: data.gender,
        tokens: " ",
    }
    const chequeEmail = await User.findOne({ where: { email: data.email } });
    if (chequeEmail) {
        return "user already exist"
    }
    else {
        var createUser = User.create(registerData);
        return createUser
    }
}
exports.login = async (data) => {
    let now = moment().format('L');
    console.log(now);
    var date = new Date();
    console.log("date",date);
    var mm = moment().utc(date, "DD-MM-YYYY");
    console.log("date",moment().utc(date, "DD-MM-YYYY"));
    console.log("mm", mm.format('DD-MM-YYYY'))
    const expiresIn = 24 * 60 * 60;
    const chequeEmail = await User.findOne({ where: { email: data.email }, attributes: { exclude: ['tokens'] } });
    // delete chequeEmail.doc.tokens;
    if (chequeEmail) {
        const accessToken = jwt.sign({ id: chequeEmail }, SECRET_KEY, {
            expiresIn: expiresIn
        });
        if (bcrypt.compareSync(data.password, chequeEmail.password)) {
            // const updateToken = await User.update({ tokens: accessToken }, {
            //     where: { id: chequeEmail.id },
            //     returning: true,
            //     plain: true
            // })
            chequeEmail.tokens = accessToken;
            await chequeEmail.save();
            // const updatedToken = await User.findById(chequeEmail.id)
            return chequeEmail
        } else {
            return "password is wrong";
        }
    }
    else {
        return "Email not exist";
    }
}
exports.logout = async (data) => {
    const logoutResult = await User.update({ tokens: "" }, { where: { tokens: data.authorization } })
    return logoutResult;
}
exports.addService = async (body, user) => {
    try {
        var serviceData = {
            name: body.name,
            userId: user.id
        }
        if (user.type === 0) {
            const addServiceResult = await Service.create(serviceData);
            return addServiceResult;
        } else {
            return "Service only add by service provider"
        }
    }
    catch (err) {
        throw err
    }
}
exports.getService = async (authId) => {
    const getServiceResult = await Service.findAll({
        include: [User], where: {
            userId: authId
        }
    });
    return getServiceResult;
}
exports.createServiceRequest = async (body, user) => {
    const serviceDetail = {
        state: 0,
        serviceProviderId: body.serviceProviderId,
        userId: user.id,
        serviceId: body.serviceId
    }
    if (user.type === 1) {
        const createServiceRequestResult = await ServiceRequests.create(serviceDetail);
        return createServiceRequestResult;
    } else {
        return "create request only by user"
    }
}
exports.getServiceRequest = async () => {
    const getServiceRequest = await ServiceRequests.findAll({ include: [User, Service] });
    return getServiceRequest;
}
exports.changeStatus = async (body, user) => {
    const status = {
        state: body.state,
    }
    if (user.type === 0) {
        const serviceRequest = await ServiceRequests.findOne({
            where: { id: body.serviceRequestId }
        });
        if (user.id === serviceRequest.serviceProviderId) {
            const changeStatusResult = await ServiceRequests.update(status, {
                where: { id: body.serviceRequestId }
            });
            return changeStatusResult;
        } else {
            return "It's not your services";
        }
    } else {
        return "change status only by serviceprovider";
    }
}
exports.addComment = async (body, user) => {
    const checkStatus = await ServiceRequests.findOne({
        where: {
            id: body.serviceRequestId
        }
    });
    const addCommentObj = {
        comment: body.comment,
        serviceRequestId: body.serviceRequestId,
        serviceProviderId: checkStatus.serviceProviderId,
        userId: user.id,
    }
    if (checkStatus.state === 1) {
        const addComment = await Comments.create(addCommentObj);
        return addComment;
    }
    else if (checkStatus.state === 0) {
        return "pending state"
    }
    else {
        return "deleted state"
    }
}
exports.getComment = async (body) => {
    const getCommentResult = await Comments.findAll({
        where: {
            serviceRequestId: body.serviceRequestId
        }
    })
    return getCommentResult;
}
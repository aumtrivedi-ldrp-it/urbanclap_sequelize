
const User = require("../services/user.service")
exports.register = async ({ body }, res) => {
    const userRegister = await User.register(body);
    res.send(userRegister);
}
exports.login = async ({ body }, res) => {
    const userRegister = await User.login(body);
    res.send(userRegister);
}
exports.logout = async ({ headers }, res) => {
    const logoutResult = await User.logout(headers);
    res.send(logoutResult);
}
exports.addService = async (req, res) => {
    const serviceResult = await User.addService(req.body, req.user)
    res.send(serviceResult)
}
exports.getService = async ({ authId }, res) => {
    const allServiceResult = await User.getService(authId);
    res.send(allServiceResult);
}
exports.createServiceRequest = async ({ body, user }, res) => {
    const serviceRequest = await User.createServiceRequest(body, user);
    res.send(serviceRequest);
}
exports.getServiceRequest = async (req, res) => {
    const getServiceRequest = await User.getServiceRequest();
    res.send(getServiceRequest);
}
exports.changeStatus = async ({ body, user }, res) => {
    const changeStatusResult = await User.changeStatus(body, user);
    res.send(changeStatusResult);
}
exports.addComment = async ({ body, user }, res) => {
    const addComment = await User.addComment(body, user);
    res.send(addComment);
}
exports.getComment = async ({ body }, res) => {
    const getCommentResult = await User.getComment(body);
    res.send(getCommentResult);
}
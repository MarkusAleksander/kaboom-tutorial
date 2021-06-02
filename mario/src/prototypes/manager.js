const ManagerPrototype = function (data) {
    this.isInitialised = false;
    this.managerName = data && data.managerName !== undefined ? data.managerName : "prototype";
}

ManagerPrototype.prototype.initialise = function initialise() {
    this.isInitialised = true;
}

// eslint-disable-next-line no-unused-vars
ManagerPrototype.prototype.update = function update(tDelta) {
    // ....
}

export default ManagerPrototype;
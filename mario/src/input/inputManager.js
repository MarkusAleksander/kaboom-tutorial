import ManagerPrototype from "./../prototypes/manager";

const InputManager = function InputManager(data) {

    this._engine = null;

    ManagerPrototype.call(this, data);

    this.initialise = (engine) => {
        if (this._engine) {
            console.warn("Input Manager already initialised");
            return;
        }
        this._engine = engine;

        ManagerPrototype.prototype.initialise.call(this);
    }

    this.createKeyDown = (key, handler) => {
        this._engine.keyDown(key, handler);
    }

    this.createKeyPress = (key, handler) => {
        this._engine.keyPress(key, handler);
    }
}

InputManager.prototype = Object.create(ManagerPrototype.prototype);
InputManager.prototype.constructor = InputManager;

const InputMgr = new InputManager({
    managerName: "InputManager"
});

export default InputMgr;
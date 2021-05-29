import kaboom from "kaboom";

const engine = (() => { console.log("Creating engine"); return kaboom() })();

export default engine;
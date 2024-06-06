import {
  argsOrArgArray,
  filter,
  not,
  raceWith
<<<<<<<< HEAD:WebAPP/.angular/cache/18.0.2/vite/deps/chunk-EEKLJX6I.js
} from "./chunk-XUSQUK27.js";
import {
  __read,
  __spreadArray
} from "./chunk-AOF462FV.js";
========
} from "./chunk-RVQ3RH6Y.js";
>>>>>>>> 2eabbdd (CADASTRO PET):WebAPP/.angular/cache/18.0.2/vite/deps/chunk-KT3RQDJZ.js

// node_modules/rxjs/dist/esm5/internal/operators/partition.js
function partition(predicate, thisArg) {
  return function(source) {
    return [filter(predicate, thisArg)(source), filter(not(predicate, thisArg))(source)];
  };
}

// node_modules/rxjs/dist/esm5/internal/operators/race.js
function race() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  return raceWith.apply(void 0, __spreadArray([], __read(argsOrArgArray(args))));
}

export {
  partition,
  race
};
<<<<<<<< HEAD:WebAPP/.angular/cache/18.0.2/vite/deps/chunk-EEKLJX6I.js
//# sourceMappingURL=chunk-EEKLJX6I.js.map
========
//# sourceMappingURL=chunk-KT3RQDJZ.js.map
>>>>>>>> 2eabbdd (CADASTRO PET):WebAPP/.angular/cache/18.0.2/vite/deps/chunk-KT3RQDJZ.js

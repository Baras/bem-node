env = function (fn) {
    return Vow.promise(fn()); 
};

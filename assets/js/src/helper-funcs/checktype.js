export const checkType = typeTarget => {

    const objectType = Object.prototype.toString.call(typeTarget);

    return objectType.slice(8, objectType.length - 1).toLowerCase();

};
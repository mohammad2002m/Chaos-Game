class Validator {
    static convertableToPositiveInteger(value){
        return Number.isInteger(Number(value)) && Number(value) > 0
    }
    static convertableToNonNegativeInteger(value){
        return Number.isInteger(Number(value)) && Number(value) >= 0
    }

    static convertableToPositiveIntegerOrNegativeOne(value){
        return Number.isInteger(Number(value)) && (Number(value) > 0 || Number(value) == -1)
    }
    static convertableToInteger(value){
        return Number.isInteger(Number(value));
    }

    static convertableToPositiveNumber(value){
        return !isNaN(Number(value)) && Number(value) > 0;
    }
    static isConvertableToOneOrNegativeOne(value){
        return Number(value) == 1 || Number(value) == -1;
    }
}
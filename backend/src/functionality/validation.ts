import * as v from "valibot";

const messages = {
    string: "debe ser un string",
    stringId: "El DNI debe ser de tipo string",
    nonEmpty: "debe ingresar el dato",
    minLength: "La longitud del id de string debe ser de 8 caracteres exactamente",
    length: "debe tener longitud de 8 caracteres",
    number: "debe ser un número",
    numberId: "El ID debe ser de tipo número",
    integerId: "El ID debe ser un número entero",
    nonNumberCharacter: "El string enviado solo debe contener números",
    invalidRole: "El rol ingresado no es válido"
}

const dniLength = 8;
const passwordMinLength = 8;
const phoneNumberLength = 10;

function validateStringNumber(dni: string): boolean {
    const validCharacters = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    for (const char of dni) {
        console.log(typeof char);
        if (!validCharacters.includes(char)) return false;
    }

    return true;
}

export function validateRole(role: string | undefined): boolean {
    if (!role) return true; // Retornamos true porque se asume que sino se manda el rol es porque es un cliente

    return (role === "admin" || role === "client");
}

const userLoginSchema = v.object({
    dni: v.pipe(
        v.string(messages.string),
        v.nonEmpty(),
        v.length(dniLength, messages.length)
    ),
    surname: v.pipe(
        v.string(messages.string),
    ),
    names: v.pipe(
        v.string(messages.string),
        v.nonEmpty()
    ), email: v.pipe(
        v.string(messages.string),
        v.email(),
        v.nonEmpty(messages.nonEmpty)
    ),
    password: v.pipe(
        v.string(messages.string),
        v.nonEmpty(),
        v.minLength(passwordMinLength, messages.minLength)
    ),
    phone_number: v.pipe(
        v.string(messages.string),
        v.nonEmpty(messages.nonEmpty),
        v.length(phoneNumberLength, messages.length),
        v.check(validateStringNumber, messages.nonNumberCharacter)
    ),
});

const itemSchema = v.object({
    orderId: v.pipe(
        v.number(messages.numberId),
        v.integer(messages.integerId),
        v.minValue(1)
    ),
    serviceId: v.pipe(
        v.number(messages.numberId),
        v.integer(messages.integerId),
        v.minValue(1)
    ),
    quantity: v.pipe(
        v.number(messages.numberId),
        v.integer(messages.integerId),
        v.minValue(1)
    )
});

export function validateNumberId(id: unknown) {
    const numberIdSchema = v.pipe(v.number(messages.numberId), v.integer(messages.integerId), v.minValue(1));

    return v.parse(numberIdSchema, id);
}

export function validateStringId(id: unknown) {
    const stringIdSchema = v.pipe(
        v.string(messages.stringId),
        v.nonEmpty(messages.nonEmpty),
        v.trim(),
        v.length(8, messages.length),
        v.check(validateStringNumber, messages.nonNumberCharacter)
    );

    return v.parse(stringIdSchema, id);
}

export function validateUserData(loginData: unknown) {
    type loginData = v.InferOutput<typeof userLoginSchema>;

    return v.parse(userLoginSchema, loginData);
}

export function validateItemData(itemData: unknown) {
    type itemData = v.InferOutput<typeof itemSchema>;

    return v.parse(itemSchema, itemData);
}

export function validateBody(body: object) {
    if (body === undefined || body === null || Object.keys(body).length === 0) return false;

    return true;
}

import * as v from "valibot";

const messages = {
    string: "debe ser un string",
    stringId: "El ID debe ser de tipo string",
    nonEmpty: "debe ingresar el dato",
    minLength: "La longitud del id de string debe ser de 8 caracteres exactamente",
    length: "debe tener longitud de 8 caracteres",
    number: "debe ser un número",
    numberId: "El ID debe ser de tipo número"
}

const dniLength = 8;
const passwordMinLength = 8;
const phoneNumberLength = 10;

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
        v.length(phoneNumberLength, messages.length)
    )
});



export function validateNumberId(id: unknown) {
    const numberIdSchema = v.pipe(v.number(messages.numberId));

    return v.parse(numberIdSchema, id);
}

export function validateStringId(id: unknown) {
    const stringIdSchema = v.pipe(v.string(messages.stringId), v.nonEmpty(messages.nonEmpty), v.trim(), v.length(8, messages.length));

    return v.parse(stringIdSchema, id);
}

export function validateUserData(loginData: unknown) {
    type loginData = v.InferOutput<typeof userLoginSchema>;

    return v.parse(userLoginSchema, loginData);
}

export function validateBody(body: object) {
    if (body === undefined || body === null || Object.keys(body).length === 0) return false;

    return true;
}

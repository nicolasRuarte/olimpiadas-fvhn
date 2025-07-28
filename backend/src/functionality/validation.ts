import * as v from "valibot";

const messages = {
    string: "debe ser un string",
    nonEmpty: "debe ingresar el dato",
    minLength: "longitud debe ser de mínimo 8 caracteres",
    length: "debe tener longitud de 8 caracteres",
    number: "debe ser un número"
}

const dniLength = 8;
const passwordMinLength = 8;
const phoneNumberLength = 10;

const userLoginSchema = v.object({
    dni: v.pipe(
        v.string(messages.string),
        v.nonEmpty(),
        v.length(dniLength)
    ),
    surname: v.pipe(
        v.string(messages.string),
    ),
    names: v.pipe(
        v.string(messages.string),
        v.nonEmpty()
    ),
    email: v.pipe(
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

const stringIdSchema = v.object({
    id: v.pipe(
        v.string(messages.string),
        v.nonEmpty(messages.nonEmpty),
    )
});

const numberIdSchema = v.object({
    id: v.pipe(
        v.number(messages.number)
    )
});

export function validateNumberId(id: number) {
    type id = v.InferOutput<typeof numberIdSchema>;

    return v.parse(numberIdSchema, id);
}

export function validateStringId(id: unknown) {
    type id = v.InferOutput<typeof stringIdSchema>;

    return v.parse(stringIdSchema, id);
}

export function validateUserData(loginData: unknown) {
    type loginData = v.InferOutput<typeof userLoginSchema>;

    return v.parse(userLoginSchema, loginData);
}

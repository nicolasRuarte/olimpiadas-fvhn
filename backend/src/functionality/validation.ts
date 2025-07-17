import * as v from "valibot";

const messages = {
    string: "debe ser un string",
    nonEmpty: "debe ingresar el dato",
    minLength: "longitud debe ser de mínimo 8 caracteres",
    length: "debe tener longitud de 8 caracteres"
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
})

export function validateNumberId(id: number) {
    if (id === undefined || id === null || typeof id !== "number") {
        return false;
    } else {
        return true;
    }
}

export function validateStringId(id: string) {
    if (id === undefined || id === null || typeof id !== "string") {
        return false;
    } else {
        return true;
    }
}

export function validateUserData(loginData: unknown) {
    type loginData = v.InferOutput<typeof userLoginSchema>;

    return v.parse(userLoginSchema, loginData);
}

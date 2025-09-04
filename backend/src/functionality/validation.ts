import * as v from "valibot";

const messages = {
    string: "Dato inválido: debe ser string",
    stringId: "El DNI debe ser de tipo string",
    nonEmpty: "Uno o más campos no están definidos",
    minLength: "La longitud del id de string debe ser de 8 caracteres exactamente",
    minNumberLength: "El número ingresado no debe ser menor a 0",
    length: "debe tener longitud de 8 caracteres",
    number: "Dato inválido: debe ser un número",
    integer: "Dato inválido: debe ser un número entero",
    numberId: "El ID debe ser de tipo número",
    integerId: "El ID debe ser un número entero",
    nonNumberCharacter: "El string enviado solo debe contener números",
    invalidRole: "El rol ingresado no es válido",
    maxRatingExceeded: "El valor de rating no debe ser mayor a 5"
}

function validateStringNumber(dni: string): boolean {
    const validCharacters = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

    for (const char of dni) {
        if (!validCharacters.includes(char)) return false;
    }

    return true;
}

export function validateRole(role: string | undefined): boolean {
    if (!role) return true; // Retornamos true porque se asume que sino se manda el rol es porque es un cliente

    return (role === "admin" || role === "client");
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
        v.length(phoneNumberLength, messages.length),
        v.check(validateStringNumber, messages.nonNumberCharacter)
    ),
});

export function validateNumberId(id: unknown) {
    const numberIdSchema = v.pipe(v.number(messages.numberId), v.integer(messages.integerId), v.minValue(1, messages.minNumberLength));

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
        v.minValue(1, messages.minNumberLength)
    )
});

export function validateItemData(itemData: unknown) {
    type itemData = v.InferOutput<typeof itemSchema>;

    return v.parse(itemSchema, itemData);
}

export function validateBody(body: object) {
    if (body === undefined || body === null || Object.keys(body).length === 0) return false;

    return true;
}

const serviceSchema = v.object({
    name: v.pipe(
        v.string(messages.string),
        v.nonEmpty(messages.nonEmpty),
        v.minLength(1)
    ),
    description: v.pipe(
        v.string(messages.string),
        v.nonEmpty(messages.nonEmpty),
        v.minLength(1)
    ),
    price: v.pipe(
        v.number(),
        v.minValue(0.00, messages.minNumberLength)
    )
})

export function validateServiceData(serviceData: unknown) {
    type serviceData = v.InferOutput<typeof serviceSchema>;

    return v.parse(serviceSchema, serviceData);
}

export function validateRatingValue(rating: number) {
    const ratingValueSchema = v.pipe(
        v.number(messages.number),
        v.integer(messages.integer),
        v.minValue(0, messages.minNumberLength),
        v.maxValue(5, messages.maxRatingExceeded)
    );

    return v.parse(ratingValueSchema, rating);
}

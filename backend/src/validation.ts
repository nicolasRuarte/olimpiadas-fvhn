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

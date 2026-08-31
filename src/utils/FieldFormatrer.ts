export class FieldFormmater {

    // format field acording to padding and length
    formatField(value: string, length: number, isNumber: boolean, align = 'left', padChar = ' ', padNumber = '0'): string {
        if (value.length > length) {
            return value.slice(0, length); // truncate
        }
        if (align === 'left') {
            return value.padEnd(length, padChar);
        } else {
            if (isNumber) {
                return value.padStart(length, padNumber);
            }
            return value.padStart(length, padChar);
        }
    }
}


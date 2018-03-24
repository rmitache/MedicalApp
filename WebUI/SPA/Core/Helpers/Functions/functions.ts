

export function GetEnumEntryByIndex(enumRef: any, index: number): any {

    let count = -1;

    for (var key in enumRef) {
        count++;
        if (count === index) {
            return key;
        }

    }

    return null;
}


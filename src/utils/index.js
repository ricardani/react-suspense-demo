export function slowImport(value, ms = 1000) {
    return new Promise(resolve => {
        setTimeout(() => resolve(value), ms);
    });
}

export function fakeImportComponent(value, ms = 1000) {
    return new Promise(resolve => {
        setTimeout(() => resolve({ default: value }), ms);
    });
}

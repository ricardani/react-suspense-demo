const STATUS_ERROR = 'error';
const STATUS_PENDING = 'pending';
const STATUS_SUCCESS = 'success';

// Suspense integrations like Relay implement
// a contract like this to integrate with React.
// Real implementations can be significantly more complex.
// Copied from https://codesandbox.io/s/frosty-hermann-bztrp
const wrapPromise = fetchFunction => {
    let status;
    let result;
    let promise;
    let key;

    const read = input => {
        if (!promise || key !== input) {
            key = input;
            status = STATUS_PENDING;
            promise = fetchFunction(input);
        }

        const suspender = promise.then(
            r => {
                status = STATUS_SUCCESS;
                result = r;
            },
            e => {
                status = STATUS_ERROR;
                result = e;
            }
        );

        if (status === STATUS_PENDING) {
            throw suspender;
        } else if (status === STATUS_ERROR) {
            throw result;
        } else if (status === STATUS_SUCCESS) {
            // Comment this line when using concurrent mode features
            promise = null;
            return result;
        }
    };

    return { read };
};

export const createResource = fetchFunction => (wrapPromise(fetchFunction));

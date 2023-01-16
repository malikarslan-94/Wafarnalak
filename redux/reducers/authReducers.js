export function auth(state = null, action) {
    switch (action.type) {
        case 'USER':
            state = action.user;
            break;

    }
    return state;
}
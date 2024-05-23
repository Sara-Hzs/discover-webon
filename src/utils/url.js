export function constructURL(path, params = {}) {
    if (path.endsWith('/') && path.length > 1) {
        path = path.slice(0, -1);
    }

    const url = new URL(path, window.location.origin);

    Object.keys(params).forEach(key => {
        url.searchParams.set(key, params[key]);
    });

    return url.toString();
}

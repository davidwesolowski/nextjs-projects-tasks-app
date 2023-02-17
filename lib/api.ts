export const fetcher = async ({ url, method, body, json = true }) => {
    let requiredOptions: any = {
        method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }

    if (body || Object.keys(body).length > 0) {
        requiredOptions = {
            ...requiredOptions,
            body: JSON.stringify(body),
        }
    }


    const res = await fetch(url, requiredOptions);

    if (!res.ok) {
        throw new Error('Error while fetching');
    }

    if (json) {
        const data = await res.json();
        
        return data.data;
    }
}

export const register = (user) => {
    return fetcher({ url: '/api/register', body: user, method: 'POST' }); 
}

export const signin = (user) => {
    return fetcher({ url: '/api/signin', body: user, method: 'POST' }); 
}

export const createProject = async (name: string) => {
    return await fetcher({
        url: '/api/projects',
        method: 'POST',
        body: { name }
    })
}
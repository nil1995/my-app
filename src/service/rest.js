const post = async (path, body) => {
    const res = await fetch(path, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    if (res.status !== 200) throw Error(await res.json());

    return res.json();
}

export default {
    post
};
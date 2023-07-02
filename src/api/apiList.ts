
const baseUrl:string="http://5.189.180.8:8010/";


export async function getHeader() {
    return await fetch(baseUrl+"header")
}

export async function getDetails() {
    return await fetch(baseUrl+"detail")
}

export async function getListItem() {
    return await fetch(baseUrl+"item")
}


export async function createData(data: any) {
    return await fetch(baseUrl+"header/multiple",{
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}
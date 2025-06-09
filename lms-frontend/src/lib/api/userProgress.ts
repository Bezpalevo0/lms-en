import type {RequestOptions} from '@/interfaces'
import {StrapiClient} from "./strapiClient.ts"

export async function userProgressRequest({endpoint, method, token, documentId}: RequestOptions) {
    const authClient = new StrapiClient({token})
    const url = method === 'DELETE'
        ? `user-progress/${endpoint}?documentId=${documentId}`
        : `user-progress/${endpoint}`

    const bodyNeeded = method !== 'DELETE'
    return await authClient.request(url, {
        method,
        headers: {'Content-Type': 'application/json'},
        ...(bodyNeeded && {body: JSON.stringify({documentId})}),
    })
}

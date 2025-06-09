import jwt from 'jsonwebtoken'
import type {AstroCookies} from 'astro'
import {JWT_SECRET} from "astro:env/server"


export function getValidatedToken(cookies: AstroCookies): string | null {
    const token = cookies.get('jwt')?.value
    if (!token) return null

    try {
        const payload = jwt.verify(token, JWT_SECRET)
        if (typeof payload === 'object' && payload.exp && payload.exp > Date.now() / 1000) {
            return token
        }
    } catch {
        return null
    }

    return null
}

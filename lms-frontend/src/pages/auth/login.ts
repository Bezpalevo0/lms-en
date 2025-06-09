import type {APIRoute} from 'astro'
import {API_URL} from "astro:env/server"


export const POST: APIRoute = async ({request, cookies, redirect}) => {
    const formData = await request.formData()
    const identifier = formData.get('identifier')?.toString().trim() || ''
    const password = formData.get('password')?.toString() || ''
    const redirectPage = formData.get('redirectPage')?.toString() || ''

    try {
        const res = await fetch(`${API_URL}/api/auth/local`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({identifier, password})
        })

        const data = await res.json()

        if (!res.ok) {
            const message = data?.error?.message || 'Login error'
            return redirect(`/auth?tab=login&error=${encodeURIComponent(message)}&r=${redirectPage}`)
        }

        cookies.set('jwt', data.jwt, {
            httpOnly: true,
            secure: true,
            path: '/',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7
        })

        return redirect(redirectPage ? redirectPage : '/u')
    } catch (error) {
        console.error(error)
        return redirect(`/auth?tab=login&error=${encodeURIComponent(error as string)}&r=${redirectPage}`)
    }
}


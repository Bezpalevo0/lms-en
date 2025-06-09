import type {APIRoute} from 'astro'
import {API_URL} from "astro:env/server"


export const POST: APIRoute = async ({request, cookies, redirect}) => {
    const formData = await request.formData()
    const username = formData.get('username')?.toString().trim() || ''
    const email = formData.get('email')?.toString().trim() || ''
    const password = formData.get('password')?.toString() || ''
    const redirectPage = formData.get('redirectPage')?.toString() || ''

    try {
        const res = await fetch(`${API_URL}/api/auth/local/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, email, password})
        })

        const data = await res.json()

        if (!res.ok) {
            const message = data?.error?.message || 'Registration failed'
            return redirect(`/auth?tab=register&error=${encodeURIComponent(message)}&r=${redirectPage}`)
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
        return redirect(`/auth?tab=register&error=${encodeURIComponent(error as string)}&r=${redirectPage}`)
    }
}

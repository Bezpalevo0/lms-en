import type {APIRoute} from 'astro'
import {addCourse, removeCourse, beginLesson, completeLesson} from '@/lib/api'
import {getValidatedToken} from '@/lib/auth'

export const POST: APIRoute = async ({request, cookies, redirect, url}) => {
    const token = getValidatedToken(cookies)
    if (!token) return new Response(null, {status: 401}) // Authorization check

    const form = await request.formData()
    const actionType = form.get('actionType')?.toString()
    const documentId = form.get('documentId')?.toString()
    const redirectPath = form.get('redirectPath')?.toString()
    const actionSourcePath = form.get('actionSourcePath')?.toString()
    const id = encodeURIComponent(documentId || '')

    // Сопоставляем тип действия с функцией
    const actionMap = {addCourse, removeCourse, beginLesson, completeLesson}
    const fn = actionMap[actionType as keyof typeof actionMap]

    if (!fn || !documentId) {
        return redirect(`${actionSourcePath}?error=Invalid input&id=${id}`) // Input error
    }

    try {
        await fn(documentId, token) // выполняем действие
        return redirect(redirectPath ? redirectPath : actionSourcePath) // Successful redirect
    } catch (err) {
        console.error(id, err)
        const msg = encodeURIComponent(err instanceof Error ? err.message : 'Unknown error')
        return redirect(`${actionSourcePath}?error=${msg}&id=${id}`) // Redirect with error
    }
}

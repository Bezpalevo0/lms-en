import type {ProgressStatus} from "@/interfaces.ts"


export function addForwardSlash(path: string): string {
    return path.endsWith("/") ? path : path + "/"
}

export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function formatProgress(total: number, completed: number) {
    if (!total || !completed) return 0
    return Math.round((completed / total) * 100)
}

export function statusClass(status: ProgressStatus) {
    return {
        in_progress: 'bg-blue-600',
        completed: 'bg-green-600'
    }[status] ?? 'bg-gray-600'
}

export function statusLabel(status: ProgressStatus) {
    return {
        in_progress: 'in progress',
        completed: 'completed'
    }[status] ?? 'not started'
}

export function formatDate(dateString: string) {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

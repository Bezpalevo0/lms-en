import {API_URL as baseURL} from "astro:env/server"


export interface StrapiClientOptions {
    token?: string | null;
}

export class StrapiClient {
    private baseURL: string
    private token?: string | null

    constructor({token = null}: StrapiClientOptions) {
        this.baseURL = baseURL
        this.token = token
    }

    async request<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
        const headers: HeadersInit = options.headers ?? {}

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`
        }

        try {
            const response = await fetch(`${this.baseURL}/api/${endpoint}`, {
                ...options,
                headers,
            })

            if (!response.ok) {
                const data = await response.json()
                console.error(`Strapi API error: ${response.status} ${response.statusText}`, data?.error)
                return null // return safe fallback
            }

            const data = await response.json()
            return data as T

        } catch (error) {
            console.error(`fetch error Strapi API:`, error)
            return null // fail gracefully
        }
    }
}

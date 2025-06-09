// @ts-check
import {loadEnv} from "vite"
import {defineConfig, envField} from 'astro/config'
import node from "@astrojs/node"
import vue from '@astrojs/vue'
import tailwindcss from "@tailwindcss/vite"


const {HOST_URL} = loadEnv(process.env.HOST_URL, process.cwd(), "")
console.log("HOST_URL:", HOST_URL)

// https://astro.build/config
export default defineConfig({
    site: HOST_URL,
    output: 'server',
    adapter: node({
        mode: "standalone"
    }),

    env: {
        schema: {
            API_URL: envField.string({context: "server", access: "secret"}),
            JWT_SECRET: envField.string({context: "server", access: "secret"}),
            PORT: envField.number({context: "server", access: "public", default: 4321, optional: true}),
        }
    },

    integrations: [
        vue(),
    ],

    vite: {
        plugins: [tailwindcss()],
    },

})

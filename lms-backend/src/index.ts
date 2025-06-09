// import type { Core } from '@strapi/strapi';

export default {
    /**
     * An asynchronous register function that runs before
     * your application is initialized.
     *
     * This gives you an opportunity to extend code.
     */
    register({strapi}) {
        strapi.db.lifecycles.subscribe({
            models: ['plugin::users-permissions.user'],

            async afterCreate(event) {
                const user = event.result

                await strapi.entityService.create('api::user-progress.user-progress', {
                    data: {
                        user: user.id,
                        courses: []
                    }
                })
            }
        })
    },

    /**
     * An asynchronous bootstrap function that runs before
     * your application gets started.
     *
     * This gives you an opportunity to set up your data model,
     * run jobs, or perform some special logic.
     */
    bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {
    },
}

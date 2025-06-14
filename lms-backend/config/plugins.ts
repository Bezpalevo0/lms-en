export default ({env}) => ({

    // https://github.com/strapi/strapi/tree/main/packages/providers/upload-aws-s3
    upload: {
        config: {
            provider: 'aws-s3',
            providerOptions: {
                baseUrl: env('AWS_URL'),
                accessKeyId: env('AWS_ACCESS_KEY_ID'),
                secretAccessKey: env('AWS_SECRET_ACCESS_KEY'),
                region: env('AWS_REGION'),
                params: {
                    ACL: 'private',
                    Bucket: env('AWS_BUCKET_NAME'),
                },
            },

            actionOptions: {
                upload: {},
                uploadStream: {},
                delete: {},
            },
        },
    },
});

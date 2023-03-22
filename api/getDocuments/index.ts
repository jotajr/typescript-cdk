import {APIGatewayProxyEventV2, Context, APIGatewayProxyStructuredResultV2} from 'aws-lambda';
import S3 from 'aws-sdk/clients/s3';


const bucketName = process.env.DOCUMENTS_BUCKET_NAME;

const s3Bucket = new S3();

export const getDocuments = async (event: APIGatewayProxyEventV2, contex: Context): Promise<APIGatewayProxyStructuredResultV2> => {
    console.log(`Bucket Name: ${bucketName}`);

    try {
        const { Contents: results } = await s3Bucket.listObjects({ Bucket: process.env.DOCUMENTS_BUCKET_NAME! }).promise();
        const documents = await Promise.all(results!.map(async r => generateSignedURL(r)));
        return {
            statusCode: 200,
            body: JSON.stringify(documents)
        }
    } catch (err: any) {
        return {
            statusCode: 500,
            body: err.message
        }
    }

}

const generateSignedURL = async (object: S3.Object): Promise<{ filename: string, url: string }> => {
    const url = await s3Bucket.getSignedUrlPromise('getObject', {
        Bucket: bucketName,
        Key: object.Key!,
        Expires: (60 * 60) // one hour
    })
    return {
        filename: object.Key!,
        url: url
    }
}
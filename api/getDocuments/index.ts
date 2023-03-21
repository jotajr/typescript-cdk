import {APIGatewayProxyEventV2, Context, APIGatewayProxyStructuredResultV2} from 'aws-lambda';

export const getDocuments = async (event: APIGatewayProxyEventV2, contex: Context): Promise<APIGatewayProxyStructuredResultV2> => {

    return {
        statusCode: 200,
        body: 'Success'
    }

}
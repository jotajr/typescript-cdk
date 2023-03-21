import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket, BucketEncryption } from 'aws-cdk-lib/aws-s3';
import { CfnOutput, Tags } from 'aws-cdk-lib';
import { Networking } from './networking';
import { DocumentManagementAPI } from './api';
import * as s3Deploy from 'aws-cdk-lib/aws-s3-deployment';
import path from 'path';

export class TypescriptCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

      const bucket = new Bucket(this, 'DocumentsBucket', {
          encryption: BucketEncryption.S3_MANAGED
      });

      new s3Deploy.BucketDeployment(this, 'DocumentsDeployment', {
        sources: [
            s3Deploy.Source.asset(path.join(__dirname, '..', 'documents'))
        ],
        destinationBucket: bucket,
        memoryLimit: 512
      })

      new CfnOutput(this, 'DocumentsBucketNameExport', {
        value: bucket.bucketName,
        exportName: 'DocumentsBucketName'
      });

      const networkingStack = new Networking(this, 'NetworkingConstruct', {
        maxAzx: 2
      });

      Tags.of(networkingStack).add('Module', 'Networking');

      const api = new DocumentManagementAPI(this, 'DocumentManagementAPI', {
        documentBucket: bucket
      });

      Tags.of(api).add('Module', 'API');

  }
}

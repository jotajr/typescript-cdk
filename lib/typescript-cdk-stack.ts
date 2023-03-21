import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket, BucketEncryption } from 'aws-cdk-lib/aws-s3';
import { CfnOutput, Tags } from 'aws-cdk-lib';
import { Networking } from './networking';
import { DocumentManagementAPI } from './api';

export class TypescriptCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

      const bucket = new Bucket(this, 'DocumentsBucket', {
          encryption: BucketEncryption.S3_MANAGED
      });

      new CfnOutput(this, 'DocumentsBucketNameExport', {
        value: bucket.bucketName,
        exportName: 'DocumentsBucketName'
      });

      const networkingStack = new Networking(this, 'NetworkingConstruct', {
        maxAzx: 2
      });

      Tags.of(networkingStack).add('Module', 'Networking');

      const api = new DocumentManagementAPI(this, 'DocumentManagementAPI', {});

      Tags.of(api).add('Module', 'API');

  }
}

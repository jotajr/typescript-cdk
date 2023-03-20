import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket, BucketEncryption } from 'aws-cdk-lib/aws-s3';
import { CfnOutput } from 'aws-cdk-lib';
import { Networking } from './networking';

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

      new Networking(this, 'NetworkingConstruct', {
        maxAzx: 2
      })

  }
}

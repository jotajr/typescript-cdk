#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { TypescriptCdkStack } from '../lib/typescript-cdk-stack';
import { Tags } from 'aws-cdk-lib';

const app = new cdk.App();
const stack = new TypescriptCdkStack(app, 'TypescriptCdkStack', {});
Tags.of(stack).add('App', 'DocumentManagement');
Tags.of(stack).add('Environment', 'Development');
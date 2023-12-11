// lib/todo-cdk-stack.ts

import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class TodoCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB Table
    const table = new dynamodb.Table(this, 'TodoTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    });

    // Lambda Function
    const todoFunction = new lambda.Function(this, 'TodoFunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'todoFunction.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    // Grant DynamoDB permissions to Lambda
    table.grantReadWriteData(todoFunction);

      // API Gateway
      const api = new apigateway.RestApi(this, 'TodoApi');
      const corsOptions: apigateway.CorsOptions = {
      allowOrigins: apigateway.Cors.ALL_ORIGINS, // 許可するオリジンを追加
      allowCredentials: true,
      };

      const integration = new apigateway.LambdaIntegration(todoFunction);
      const resource = api.root.addResource('todo');
      resource.addCorsPreflight(corsOptions);
      resource.addMethod('GET', integration);
      resource.addMethod('POST', integration);
  }
}


import {RemovalPolicy, Stack, StackProps} from 'aws-cdk-lib'
import { AttributeType, Table as DynamoDbTable, ITable} from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs/lib/construct'
import { getStackSuffix } from '../Utils';

// Define a new Stack
// Note that the "export" keyword makes the class availble to classes in other modules
export class DataStack extends Stack {

    public readonly spacesTable: ITable

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // We need export the table so that Lambda can read from it
        // It is important that every DynamoDB table has a partitionkey
        // Should the key be named "id" always? IDK!!
        this.spacesTable = new DynamoDbTable(this, 'SpacesTable', {
            partitionKey: {
                name: 'id',
                type: AttributeType.STRING
            },
            removalPolicy: RemovalPolicy.DESTROY,
            tableName: `SpaceTable-${getStackSuffix(this)}`
        });

    }
}
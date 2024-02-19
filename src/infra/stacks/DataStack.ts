
import {Stack, StackProps} from 'aws-cdk-lib'
import { Construct } from 'constructs/lib/construct'

// Define a new Stack
// Note that the "export" keyword makes the class availble to classes in other modules
export class DataStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props)
    }
}
import { Fn, Stack } from "aws-cdk-lib"


export function getStackSuffix(stack: Stack){
    const shortStackId = Fn.select(2, Fn.split('/', stack.stackId)); // brings the part from the stackId after the last '/'
    const stackSuffix = Fn.select(4, Fn.split('-', shortStackId));
    return stackSuffix;
}
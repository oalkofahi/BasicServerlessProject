import { AuthService } from "./AuthService";



async function testAuth() {
    const service = new AuthService();
    const loginResult = await service.login ( {
        username: 'tester',
        password: 'Sahar198@'
        }
    )
    console.log(loginResult.isSignedIn);
    console.log(loginResult.nextStep);
}



testAuth();
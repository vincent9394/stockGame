import { LoginReducers } from './reducers';
import { ILoginState } from './state';
import { ToLogInSuccess, ToLogOutSuccess, ToRegisterSuccess } from './actions';


describe('LoginReducers', () => {
    let initialState: ILoginState;

    beforeEach(() => {
        initialState = {
            isLoggedIn: false,
            username: null,
        }
    })

    it("should be logged In", () => {
        const finalState = LoginReducers(initialState, ToLogInSuccess('Peter'));
        expect(finalState).toEqual({
            username: 'Peter',
            isLoggedIn: true,
        });
    });

    it("should be logged Out", () => {
        const finalState = LoginReducers(initialState, ToLogOutSuccess());
        expect(finalState).toEqual({
            username: null,
            isLoggedIn: false,
        });
    });
    it("should be register successfully", () => {
        const finalState = LoginReducers(initialState, ToRegisterSuccess('John'));
        expect(finalState).toEqual({
            username: 'John',
            isLoggedIn: true,
        });
    });

    /* it("should be handle fail case successfully",()=>{
         const finalState = LoginReducers( initialState, ToRegisterSuccess('John'));
         expect(finalState).toEqual({
             username: 'John',
             isLoggedIn:true,
         });
     });*/
});
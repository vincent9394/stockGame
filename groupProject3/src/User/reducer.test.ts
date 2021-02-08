import { LoginReducers } from './reducers';
import { ILoginState } from './state';
import { ToLogInSuccess, ToLogOutSuccess, ToRegisterSuccess } from './actions';


describe('LoginReducers', () => {
    let initialState: ILoginState;

    beforeEach(() => {
        initialState = {
            isLoggedIn: false,
            username: null,
            msg:"",
            accountBalance:null,
        }
    })

    it("should be logged In", () => {
        const finalState = LoginReducers(initialState, ToLogInSuccess('Peter',5000));
        expect(finalState).toEqual({
            username: 'Peter',
            isLoggedIn: true,
            msg:"",
            accountBalance:5000
        });
    });

    it("should be logged Out", () => {
        const finalState = LoginReducers(initialState, ToLogOutSuccess());
        expect(finalState).toEqual({
            username: null,
            isLoggedIn: false,
            msg:"",
            accountBalance:null,
        });
    });
    it("should be register successfully", () => {
        const finalState = LoginReducers(initialState, ToRegisterSuccess('John',5000));
        expect(finalState).toEqual({
            username: 'John',
            isLoggedIn: true,
            msg:"",
            accountBalance:5000
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
import { LoginReducers } from './reducers';
import { ILoginState } from './state';
import { ToLogInSuccess, ToLogOutSuccess, ToRegisterSuccess } from './actions';
describe('Login Reducers', () => {
    let initialState:ILoginState;
    let localStorage:Storage
    const localStorageMock = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        clear: jest.fn(),
        removeItem:jest.fn(),
        key:jest.fn(),
        length:1,
        store:{},
      };
      global.localStorage = localStorageMock;
        beforeEach(() => {
            (localStorage.getItem as jest.Mock).mockReturnValue(null)
        initialState = {
            isLoggedIn: false,
            username: null,
            msg: "",
            accountBalance: null
        };
    })
    it("should be logged In", () => {
        const finalState = LoginReducers(initialState, ToLogInSuccess('Peter', 100000));
expect(localStorage.setItem).toBeCalledTimes(1)
        expect(finalState).toEqual({
            username: 'Peter',
            isLoggedIn: true,
            msg: "",
            accountBalance: 100000
        });
    });
    it("should be logged Out", () => {
        const finalState = LoginReducers(initialState, ToLogOutSuccess());
        expect(finalState).toEqual({
            username: null,
            isLoggedIn: false,
            msg: "",
            accountBalance: null
        });
    });
    it("should be register successfully", () => {
        const finalState = LoginReducers(initialState, ToRegisterSuccess('John', 100000));
        expect(finalState).toEqual({
            username: 'John',
            isLoggedIn: true,
            msg: "",
            accountBalance: 100000
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
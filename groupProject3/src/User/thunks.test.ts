import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store'
import thunk from 'redux-thunk'
import { ToLogInSuccess, ToRegisterSuccess, failed } from './actions';
import { ToLogInThunk, ToRegisterThunk } from './thunks';
import fetchMock from 'fetch-mock';
import { IRootState, ThunkDispatch } from '../store';



describe('Login thunks', () => {
    let store: MockStoreEnhanced<IRootState, ThunkDispatch>;

    beforeEach(() => {
        const mockStore = configureMockStore<IRootState, ThunkDispatch>([thunk])
        store = mockStore();
        jest.spyOn(window.localStorage.__proto__, 'setItem');
      
    })

    it('should login successfully', async () => {
        const result= {
            result:true,
            AccountBalance:100000,
            token: '123'
        }
           const  data= {
                username: 'Peter'
            }
        fetchMock.post(`${process.env.REACT_APP_API_SERVER}/login`,
            { body: result, status: 200 });

        const expectedActions = [
            ToLogInSuccess(data.username,100000),
        ]
        await store.dispatch(ToLogInThunk('Peter', '12345678'));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should fail to login', async () => {
        const result = {
            isSuccess: false,
            msg: "Failed to login"
        };
        fetchMock.post(`${process.env.REACT_APP_API_SERVER}/login`,
            { body: result, status: 200 });

        const expectedActions = [
            failed('TO_LOGIN_FAILED', result.msg)
        ]

        await store.dispatch(ToLogInThunk('Peter', '12345678'));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should be register successfully', async () => {
        const result= {
            result:true,
            AccountBalance:100000,
            token: '123'
        }
            const data={
                username: 'Peter'
            }
        fetchMock.post(`${process.env.REACT_APP_API_SERVER}/register`,
            { body: result, status: 200 });

        const expectedActions = [
            ToRegisterSuccess(data.username,100000),
        ]
        await store.dispatch(ToRegisterThunk('Peter', '12345678', 'abcde@gmail.com'));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should be fail to register', async () => {
        const result = {
            isSuccess: false,
            msg: "Failed to register"
        };
        fetchMock.post(`${process.env.REACT_APP_API_SERVER}/register`,
            { body: result, status: 200 });

        const expectedActions = [
            failed('TO_REGISTER_FAILED', result.msg)
        ]

        await store.dispatch(ToRegisterThunk('Peter', '12345678', 'abcde@gmail.com'));
        expect(store.getActions()).toEqual(expectedActions);
    });


    afterEach(() => {
        fetchMock.restore()
    });
})
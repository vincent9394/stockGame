import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store'
import thunk from 'redux-thunk'
import { ToBuyStockSuccess, ToSoldStockSuccess, failed } from './actions';
import { ToBuyStockThunk, ToSoldStockThunk } from './thunks';
import fetchMock from 'fetch-mock';
import { IRootState, ThunkDispatch } from '../store';



describe('Stock thunks', () => {
    let store: MockStoreEnhanced<IRootState, ThunkDispatch>;

    beforeEach(() => {
        const mockStore = configureMockStore<IRootState, ThunkDispatch>([thunk])
        store = mockStore();
    })

    it('should buy stock successfully', async () => {
        const result = {
            isSuccess: true,
            data: {
                username: 'Peter'
            }
        };
        fetchMock.post(`${process.env.REACT_APP_API_SERVER}/buyStock`,
            { body: result, status: 200 });

        const expectedActions = [
            ToBuyStockSuccess('123.hk', 30, 0.2),
        ]
        await store.dispatch(ToBuyStockThunk('123.hk', 30, 0.2));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should be fail to buy the stock', async () => {
        const result = {
            isSuccess: false,
            msg: "Failed to buy the stock"
        };
        fetchMock.post(`${process.env.REACT_APP_API_SERVER}/buyStock`,
            { body: result, status: 200 });

        const expectedActions = [
            failed("TO_BUY_STOCK_FAILED", result.msg)
        ]

        await store.dispatch(ToBuyStockThunk('123.hk', 30, 0.2));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should be sold out the stock successfully', async () => {
        const result = {
            isSuccess: true,
            data: {
                username: 'Peter'
            }
        };
        fetchMock.post(`${process.env.REACT_APP_API_SERVER}/soldStock`,
            { body: result, status: 200 });

        const expectedActions = [
            ToSoldStockSuccess('123.hk', 30, 0.2),
        ]
        await store.dispatch(ToSoldStockThunk('123.hk', -50, 0.4));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should be fail to sold the stock', async () => {
        const result = {
            isSuccess: false,
            msg: "Failed to sold out the stock"
        };
        fetchMock.post(`${process.env.REACT_APP_API_SERVER}/soldStock`,
            { body: result, status: 200 });

        const expectedActions = [
            failed("TO_SOLD_STOCK_FAILED", result.msg)
        ]

        await store.dispatch(ToSoldStockThunk('123.hk', -50, 0.4));
        expect(store.getActions()).toEqual(expectedActions);
    });


    afterEach(() => {
        fetchMock.restore()
    });
})
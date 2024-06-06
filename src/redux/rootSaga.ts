import { all, AllEffect, ForkEffect } from "redux-saga/effects";
import { watchLogin } from "./login/sagas";
import { watchCompanyDetails } from "./company/sagas";

export default function* rootSaga(): Generator<AllEffect<ForkEffect<void>>> {
  yield all([watchLogin() as unknown as ForkEffect<void>, watchCompanyDetails() as unknown as ForkEffect<void>]);
}

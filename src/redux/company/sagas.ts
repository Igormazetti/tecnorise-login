import { call, put, takeLatest } from "redux-saga/effects";
import { client } from "../../client";
import { GET_COMPANY_DETAILS, UPDATE_COMPANY_DETAILS } from "../../graphql/Query";
import { CompanyDetails, setDetails } from "./actions";

export type CompanyPayload = {
  type: string;
  payload: {
    id: string;
  };
};

export type UpdateCompanyPayload = {
  type: string;
  payload: CompanyDetails;
};

function* getCompanyDetails(action: CompanyPayload) {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const response = yield call(client.query, {
      query: GET_COMPANY_DETAILS,
      variables: { isn_empresa: action.payload.id },
    });
    const { getEmpresa } = response.data;

    yield put(
      setDetails({
        isn_empresa: action.payload.id,
        valor_cartao_rfid: getEmpresa.valor_cartao_rfid,
        valor_tag_veicular: getEmpresa.valor_tag_veicular,
        valor_chaveiro_rfid: getEmpresa.valor_chaveiro_rfid,
        valor_pulseira_rfid: getEmpresa.valor_pulseira_rfid,
        valor_controle_remoto: getEmpresa.valor_controle_remoto,
      })
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    yield put({ type: "@company/GET_COMPANY_DETAILS_FAILED", message: e.message });
  }
}

function* updateCompanyDetails(action: UpdateCompanyPayload) {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const response = yield call(client.mutate, {
      mutation: UPDATE_COMPANY_DETAILS,
      variables: { ...action.payload },
    });

    if (response.data.updateEmpresa.result) {
      yield put(setDetails({ ...action.payload }));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    yield put({ type: "@company/UPDATE_COMPANY_DETAILS", message: e.message });
  }
}

export function* watchCompanyDetails() {
  yield takeLatest("@company/GET_COMPANY_DETAILS", getCompanyDetails);
  yield takeLatest("@company/UPDATE_COMPANY_DETAILS", updateCompanyDetails);
}

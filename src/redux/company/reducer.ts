import { produce } from "immer";
import { CompanyDetails } from "./actions";

type ActionType = {
  type: string;
  payload: CompanyDetails;
};

const initialState = {
  isn_empresa: "",
  valor_cartao_rfid: "",
  valor_tag_veicular: "",
  valor_chaveiro_rfid: "",
  valor_pulseira_rfid: "",
  valor_controle_remoto: "",
};

export default function getCompany(state = initialState, action: ActionType) {
  switch (action.type) {
    case "@company/SET_COMPANY_DETAILS":
      return produce(state, (draft) => {
        const { isn_empresa, valor_cartao_rfid, valor_tag_veicular, valor_chaveiro_rfid, valor_pulseira_rfid, valor_controle_remoto } =
          action.payload;
        draft.isn_empresa = isn_empresa;
        draft.valor_cartao_rfid = valor_cartao_rfid;
        draft.valor_tag_veicular = valor_tag_veicular;
        draft.valor_chaveiro_rfid = valor_chaveiro_rfid;
        draft.valor_pulseira_rfid = valor_pulseira_rfid;
        draft.valor_controle_remoto = valor_controle_remoto;
      });

    default:
      return state;
  }
}

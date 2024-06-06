export type CompanyDetails = {
  isn_empresa: string;
  valor_cartao_rfid: string;
  valor_tag_veicular: string;
  valor_chaveiro_rfid: string;
  valor_pulseira_rfid: string;
  valor_controle_remoto: string;
};

export function setDetails(data: CompanyDetails) {
  return {
    type: "@company/SET_COMPANY_DETAILS",
    payload: data,
  };
}

export function getDetails(id: string) {
  return {
    type: "@company/GET_COMPANY_DETAILS",
    payload: { id },
  };
}

export const updateDetails = (data: CompanyDetails) => ({
  type: "@company/UPDATE_COMPANY_DETAILS",
  payload: data,
});

import { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as CompanyActions from "../redux/company/actions";
import { CompanyDetails } from "../redux/company/actions";
import { User } from "../redux/login/reducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatCurrency } from "../utils/currencyFormatter";

type FormValues = {
  valor_chaveiro_rfid: string;
  valor_pulseira_rfid: string;
  valor_controle_remoto: string;
  valor_tag_veicular: string;
  valor_cartao_rfid: string;
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((s: { user: User }) => s.user);
  const company = useSelector((s: { company: CompanyDetails }) => s.company);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(CompanyActions.updateDetails({ ...data, isn_empresa: user.id }));
    toast.success("Dados atualizados com sucesso!");
  };

  const handleCurrencyChange = (onChange: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value) {
      return "";
    }
    const formattedValue = formatCurrency(value);
    onChange(formattedValue);
  };

  useEffect(() => {
    if (user.id) {
      dispatch(CompanyActions.getDetails(user.id));
    }
  }, [user.id]);

  useEffect(() => {
    setValue("valor_cartao_rfid", company.valor_cartao_rfid ? formatCurrency(company.valor_cartao_rfid) : "");
    setValue("valor_tag_veicular", company.valor_tag_veicular ? formatCurrency(company.valor_tag_veicular) : "");
    setValue("valor_chaveiro_rfid", company.valor_chaveiro_rfid ? formatCurrency(company.valor_chaveiro_rfid) : "");
    setValue("valor_pulseira_rfid", company.valor_pulseira_rfid ? formatCurrency(company.valor_pulseira_rfid) : "");
    setValue("valor_controle_remoto", company.valor_controle_remoto ? formatCurrency(company.valor_controle_remoto) : "");
  }, [company]);

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-200">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-4xl mb-6">Dashboard</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Chaveiro RFID</label>
          <Controller
            name="valor_chaveiro_rfid"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                {...field}
                onChange={handleCurrencyChange(field.onChange)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            )}
          />
          {errors.valor_chaveiro_rfid && <span className="text-red-500">Este campo é obrigatório</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Pulseira RFID</label>
          <Controller
            name="valor_pulseira_rfid"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                {...field}
                onChange={handleCurrencyChange(field.onChange)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            )}
          />
          {errors.valor_pulseira_rfid && <span className="text-red-500">Este campo é obrigatório</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Controle veicular</label>
          <Controller
            name="valor_controle_remoto"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                {...field}
                onChange={handleCurrencyChange(field.onChange)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            )}
          />
          {errors.valor_controle_remoto && <span className="text-red-500">Este campo é obrigatório</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Tag veicular</label>
          <Controller
            name="valor_tag_veicular"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                {...field}
                onChange={handleCurrencyChange(field.onChange)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            )}
          />
          {errors.valor_tag_veicular && <span className="text-red-500">Este campo é obrigatório</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Cartão RFID</label>
          <Controller
            name="valor_cartao_rfid"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                {...field}
                onChange={handleCurrencyChange(field.onChange)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            )}
          />
          {errors.valor_cartao_rfid && <span className="text-red-500">Este campo é obrigatório</span>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4">
          Salvar alterações
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

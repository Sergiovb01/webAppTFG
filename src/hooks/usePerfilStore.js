import { useDispatch, useSelector } from 'react-redux';
import webbAppApi from '../api/webbAppApi';
import { setPerfilCreado, setPerfilNoCreado } from '../store/perfil/perfilSlice';

export const usePerfilStore = () => {

  const dispatch = useDispatch();
  const { isPerfilCreated } = useSelector(state => state.perfil);

  const startCrearPerfil = async (perfilData)  => {
    try {
      const { data } = await webbAppApi.get('/perfil', perfilData);
      if (data.perfil) {
        dispatch(setPerfilCreado());
      } else {
        dispatch(setPerfilNoCreado());
      }
    } catch (error) {
      dispatch(setPerfilNoCreado());
    }
  };

  return {
    isPerfilCreated,
    startCrearPerfil
  };
};

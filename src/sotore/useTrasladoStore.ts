import { create } from 'zustand';
import { Traslado } from '../interfaces/Traslado';
import axiosInstance from '../config/axiosInstance';

interface TrasladoState {
  traslados: Traslado[];
  huellaCarbonoTotal: number;
  fetchTraslados: () => Promise<void>;
  fetchHuellaCarbonoTotal: () => Promise<void>;
  addTraslado: (traslado: Traslado) => void;
  removeTraslado: (id: number) => void;
}

export const useTrasladoStore = create<TrasladoState>((set, get) => ({
  traslados: [],
  huellaCarbonoTotal: 0,

  fetchTraslados: async () => {
    try {
      const response = await axiosInstance.get('/traslado');
      set({ traslados: response.data });
      // También actualiza la huella de carbono total
      await get().fetchHuellaCarbonoTotal();
    } catch (error) {
      console.error('Error al obtener traslados:', error);
    }
  },

  fetchHuellaCarbonoTotal: async () => {
    try {
      const response = await axiosInstance.get('/traslado/huella-carbono/total');
      console.log(response)
      set({ huellaCarbonoTotal: response.data.huellaTotal });
    } catch (error) {
      console.error('Error al obtener huella de carbono total:', error);
    }
  },

  addTraslado: (traslado) => {
    set((state) => ({
      traslados: [...state.traslados, traslado],
    }));
    // Actualiza la huella de carbono total
    get().fetchHuellaCarbonoTotal();
  },

  removeTraslado: (id) => {
    set((state) => ({
      traslados: state.traslados.filter((traslado) => traslado.id !== id),
    }));
    // Actualiza la huella de carbono total
    get().fetchHuellaCarbonoTotal();
  },
}));

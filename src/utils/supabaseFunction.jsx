import { supabase } from '../utils/supabase';

export const getAllStudies = async () => {
  // const studies = await supabase.from('study-record').select('*');
  const { data, error } = await supabase.from('study-record').select('*');
  if (error) throw error;
  return data;
};

export const addStudy = async (study) => {
  const { data, error } = await supabase.from('study-record').insert(study).single();
  if (error) throw error ;
  return data;
};

export const deleteStudy = async (id) => {
  const { error } = await supabase.from('study-record').delete().match({ id });
  if (error) throw error ;
};

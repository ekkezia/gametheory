import supabase from '../supabase/supabase';

export const getSubmission = async () => {
  try {
    // const docs = await getDocs(collection(db, "gametheory"));
    const { data } = await supabase.from('gametheory').select();
    return data;
  } catch (err) {
    console.log('error', err);
  }
}
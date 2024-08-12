import supabase from "../supabase/supabase";

//TODO: rename pic to decision, rename imageNo to game result
export const postSubmission = async (name, decision, gameResult) => {
  try {
    const submission = {
      name: name,
      decision: decision,
      gameresult: gameResult,
    };
    const { data } = await supabase.from('gametheory').insert(submission).select();

    console.log('done submitting', data);

    // TODO: if submit is SUCCESSFUL, set local storage
    localStorage.setItem("username_is_submitted", data.name);

    // TODO: fix exit action
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
        // TODO: fix exit action
    return false;
  }
};
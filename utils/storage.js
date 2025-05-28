import AsyncStorage from "@react-native-async-storage/async-storage";

const NOTES_KEY = "MY_NOTES_APP";

export const getAllNotes = async () => {
  try {
    const stored = await AsyncStorage.getItem(NOTES_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error("Failed to load notes:", error);
    return {};
  }
};

export const getNote = async (id) => {
  const notes = await getAllNotes();
  return notes[id] || null;
};

export const saveNote = async (id, noteData) => {
  try {
    const notes = await getAllNotes();
    notes[id] = { ...noteData, id }; // keep note ID inside the note object
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Failed to save note:", error);
  }
};

export const deleteNote = async (id) => {
  try {
    const notes = await getAllNotes();
    delete notes[id];
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Failed to delete note:", error);
  }
};

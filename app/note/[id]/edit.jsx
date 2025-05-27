// app/note/[id]/edit.jsx
import { useLocalSearchParams } from "expo-router";
import NoteForm from "../../../components/NoteForm";

export default function EditNoteScreen() {
  const { id } = useLocalSearchParams();
  return <NoteForm noteId={id} />;
}

// app/note/[id]/edit.jsx
import { useLocalSearchParams } from "expo-router";
import Form from "../../Form";

export default function EditNoteScreen() {
  const { id } = useLocalSearchParams();
  return <Form noteId={id} />;
}

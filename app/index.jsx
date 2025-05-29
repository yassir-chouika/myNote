import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useFocusEffect, router } from "expo-router";
import { getAllNotes } from "../utils/storage";
import dayjs from "dayjs";
import "../global.css";

// Priority label and color mapping
const priorityStyles = {
  top: { label: "Important", bgColor: "#F45B69" },
  moderate: { label: "Normal", bgColor: "#456990" },
  wait: { label: "Later", bgColor: "#115f30" },
};

export default function Dashboard() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const allNotesObj = await getAllNotes();
    const notesArray = Object.values(allNotesObj); // Convert object to array
    setNotes(notesArray);
  };

  useFocusEffect(() => {
    fetchNotes();
  });

  return (
    <ScrollView className="flex-1 bg-[#626a76] px-4 pt-5 ">
      {/* Header with title + Add Note button */}
      <View className="mb-6 flex-row justify-between items-center">
        <Text className="text-2xl font-medium text-[#114B5F]">myNote</Text>
        <TouchableOpacity
          className="bg-[#7EE4EC] rounded-lg px-4 py-2"
          onPress={() => router.push("/Form")}
        >
          <Text className="text-[#114B5F] font-medium">Add Note</Text>
        </TouchableOpacity>
      </View>

      {/* Notes List */}
      {notes.map((note) => {
        const { label, bgColor } = priorityStyles[note.priority] || {};
        const formattedTime = note.updatedAt
          ? dayjs(note.updatedAt).format("MMM D, YYYY h:mm A")
          : "";

        return (
          <TouchableOpacity
            key={note.id}
            onPress={() => router.push(`/note/${note.id}/view`)}
            className="bg-white rounded-2xl p-4 mb-4 shadow-md"
          >
            {/* Title and Priority Badge */}
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-lg font-semibold text-[#114B5F]">
                {note.title}
              </Text>
              {label && (
                <View
                  className="px-4 py-2 rounded-full "
                  style={{ backgroundColor: bgColor }}
                >
                  <Text className="text-xs text-white">{label}</Text>
                </View>
              )}
            </View>

            {/* Content preview */}
            <Text className="text-[#456990] min-h-28 my-4" numberOfLines={4}>
              {note.content}
            </Text>

            {/* Last updated time */}
            <Text className="text-xs text-center text-gray-500">{formattedTime}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

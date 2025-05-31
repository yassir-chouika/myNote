import { View, Text, Pressable, Alert, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getNote, deleteNote } from "../../../utils/storage";
import dayjs from "dayjs";

const priorityStyles = {
  top: { label: "Important", bgColor: "#F45B69" },
  moderate: { label: "Normal", bgColor: "#456990" },
  wait: { label: "Later", bgColor: "#115f30" },
};

export default function NoteDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const loadNote = async () => {
      const fetched = await getNote(id);
      setNote(fetched);
    };
    loadNote();
  }, [id]);

  if (!note) return null;

  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this note?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteNote(id);
            router.replace("/");
          },
        },
      ]
    );
  };

  const { label, bgColor } = priorityStyles[note.priority] || {};
  const formattedTime = note.updatedAt
    ? dayjs(note.updatedAt).format("MMM D, YYYY h:mm A")
    : "";

  return (
    <View className="flex-1 bg-[#114B5F]">
      {/* Back button */}
      <View className="flex flex-row items-center">
        <Pressable
          onPress={() => router.replace("/")}
          className="mx-4 my-3 w-14 h-14 rounded-lg bg-[#114B5F]/10 items-center justify-center active:bg-[#114B5F]/20"
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.7 : 1,
              transform: [{ scale: pressed ? 0.95 : 1 }],
            },
          ]}
        >
          <Text className="text-white font-bold text-xl">←</Text>
        </Pressable>
        <Text className="text-xl font-medium text-white flex-1 mr-16">
          Note Details
        </Text>
      </View>

      {/* Main scrollable area */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4 pb-6">
        <View className="bg-white rounded-2xl shadow-md p-6 min-h-[350px] flex-1 justify-between">
          {/* Top content section */}
          <View>
            {/* Title and Priority */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-semibold text-[#114B5F] flex-1 pr-4">
                {note.title}
              </Text>
              {label && (
                <View
                  className="px-4 py-2 rounded-full"
                  style={{ backgroundColor: bgColor }}
                >
                  <Text className="text-xs text-white">{label}</Text>
                </View>
              )}
            </View>

            {/* Full Content */}
            <Text className="text-[#456990] mb-4 text-justify leading-6">
              {note.content}
            </Text>

            {/* Time */}
            <Text className="text-xs text-gray-500">{formattedTime}</Text>
          </View>

          {/* Buttons at the bottom */}
          <View className="mt-6 flex-row justify-center gap-3">
            <Pressable
              onPress={() => router.push(`/note/${id}/edit`)}
              className="bg-[#7EE4EC] rounded-xl px-6 py-3"
            >
              <Text className="text-white font-semibold">Modify</Text>
            </Pressable>
            <Pressable
              onPress={handleDelete}
              className="bg-[#F45B69] rounded-xl px-6 py-3"
            >
              <Text className="text-white font-semibold">Delete</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

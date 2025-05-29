import { View, Text, Pressable, Alert, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getNote, deleteNote } from "../../../utils/storage";

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
        {
          text: "Cancel",
          style: "cancel",
        },
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

  const badgeColor = {
    "Top Priority": "bg-[#F45B69]",
    Moderate: "bg-[#456990]",
    "It Can Wait": "bg-[#FFD4CA]",
  };

  return (
    <ScrollView className="bg-[#626a76] pt-20"
      contentContainerStyle={{ paddingVertical: 32, paddingHorizontal: 20 }}
    >
      <View className="bg-white rounded-2xl shadow-xl p-6 min-h-[350px] justify-between">
        {/* Title + Priority */}
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-light text-gray-900 flex-1 pr-4">
            {note.title}
          </Text>
          <View
            className={`rounded-full px-4 py-2 ${
              badgeColor[note.priority] || "bg-gray-300"
            }`}
          >
            <Text className="text-white text-xs font-semibold text-center">
              {note.priority}
            </Text>
          </View>
        </View>

        {/* Full Content */}
        <Text className="text-base leading-7 text-gray-700 mb-6">
          {note.content}
        </Text>

        {/* Time */}
        <View className="items-center mb-6">
          <Text className="text-xl font-light text-gray-600">{note.time}</Text>
        </View>

        {/* Actions */}
        <View className="flex-row justify-center gap-3">
          <Pressable
            onPress={() => router.push(`/note/${id}/edit`)}
            className="bg-[#7EE4EC] rounded-xl px-10 py-3"
          >
            <Text className="text-white font-semibold">Modify</Text>
          </Pressable>
          <Pressable
            onPress={handleDelete}
            className="bg-[#F45B69] rounded-xl px-10 py-3"
          >
            <Text className="text-white font-semibold">Delete</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

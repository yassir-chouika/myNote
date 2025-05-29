import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { getNote, saveNote } from "../utils/storage";

export default function Form({ noteId }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("");

  // Load existing note when editing
  useEffect(() => {
    if (noteId) {
      const loadNote = async () => {
        const existingNote = await getNote(noteId);
        if (existingNote) {
          setTitle(existingNote.title);
          setContent(existingNote.content);
          setPriority(existingNote.priority);
        }
      };
      loadNote();
    }
  }, [noteId]);

  const handleSave = async () => {
    const id = noteId || Date.now().toString();
    const noteData = {
      title,
      content,
      priority,
      updatedAt: Date.now(),
    };

    await saveNote(id, noteData);
    router.push("/");
  };

  return (
    <ScrollView className="flex-1 bg-[#FFD4CA]">
      {/* Header */}
      <View className="px-4 py-6 bg-[#FFD4CA]">
        <Text className="text-2xl font-medium text-[#114B5F]">myNote</Text>
        
      </View>

      {/* Form Fields */}
      <View className="px-4">
        {/* Title */}
        <View className="mb-6">
          <Text className="text-base font-medium text-[#114B5F] mb-3">
            Title
          </Text>
          <TextInput
            className="bg-white border border-[#7EE4EC] rounded-lg px-4 py-3 text-base text-[#114B5F]"
            value={title}
            onChangeText={setTitle}
            placeholder="Note title"
          />
        </View>

        {/* Content */}
        <View className="mb-8">
          <Text className="text-base font-medium text-[#114B5F] mb-3">
            Content
          </Text>
          <TextInput
            className="bg-white border border-[#7EE4EC] rounded-lg px-4 py-3 text-base min-h-48 text-[#114B5F]"
            value={content}
            onChangeText={setContent}
            placeholder="Write your note here..."
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Priority */}
        <View className="mb-8">
          <View className="flex-row justify-center gap-4 mb-4">
            <TouchableOpacity
              className={`flex-row items-center px-4 py-2 rounded-lg ${
                priority === "top" ? "bg-[#F45B69]" : "bg-gray-200"
              }`}
              onPress={() => setPriority(priority === "top" ? "" : "top")}
            >
              <View
                className={`w-4 h-4 border-2 rounded mr-2 ${
                  priority === "top"
                    ? "bg-[#F45B69] border-[#F45B69]"
                    : "border-gray-400"
                }`}
              />
              <Text className="text-sm font-medium text-[#114B5F]">
                Top Priority
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-row items-center px-4 py-2 rounded-lg ${
                priority === "moderate" ? "bg-[#456990]" : "bg-gray-200"
              }`}
              onPress={() =>
                setPriority(priority === "moderate" ? "" : "moderate")
              }
            >
              <View
                className={`w-4 h-4 border-2 rounded mr-2 ${
                  priority === "moderate"
                    ? "bg-[#456990] border-[#456990]"
                    : "border-gray-400"
                }`}
              />
              <Text className="text-sm font-medium text-[#114B5F]">
                Moderate
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center">
            <TouchableOpacity
              className={`flex-row items-center px-4 py-2 rounded-lg ${
                priority === "wait" ? "bg-[#115f30]" : "bg-gray-200"
              }`}
              onPress={() => setPriority(priority === "wait" ? "" : "wait")}
            >
              <View
                className={`w-4 h-4 border-2 rounded mr-2 ${
                  priority === "wait"
                    ? "bg-[#115f30] border-[#115f30]"
                    : "border-gray-400"
                }`}
              />
              <Text className="text-sm font-medium text-white">
                It Can Wait
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          className="bg-[#7EE4EC] rounded-lg py-4 mx-4 mb-8"
          onPress={handleSave}
        >
          <Text className="text-[#114B5F] text-center text-base font-medium">
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

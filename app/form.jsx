import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { getNote, saveNote } from "../utils/storage";

export default function Form({ noteId }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("");
  const [errors, setErrors] = useState({});

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

  // Clear errors when user starts typing/selecting
  useEffect(() => {
    if (title && errors.title) {
      setErrors((prev) => ({ ...prev, title: null }));
    }
  }, [title]);

  useEffect(() => {
    if (content && errors.content) {
      setErrors((prev) => ({ ...prev, content: null }));
    }
  }, [content]);

  useEffect(() => {
    if (priority && errors.priority) {
      setErrors((prev) => ({ ...prev, priority: null }));
    }
  }, [priority]);

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!content.trim()) {
      newErrors.content = "Content is required";
    }

    if (!priority) {
      newErrors.priority = "Please select a priority level";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      Alert.alert(
        "Missing Information",
        "Please fill in all required fields and select a priority level."
      );
      return;
    }

    const id = noteId || Date.now().toString();
    const noteData = {
      title: title.trim(),
      content: content.trim(),
      priority,
      updatedAt: Date.now(),
    };

    await saveNote(id, noteData);
    router.push("/");
  };

  return (
    <ScrollView className="flex-1 bg-[#114B5F]">
      <View className="flex flex-row items-center">
        <Pressable
          onPress={() => router.back()}
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
          {noteId ? "Edit Note" : "New Note"}
        </Text>
      </View>

      {/* Form Fields */}
      <View className="px-4">
        {/* Title */}
        <View className="mb-6">
          <Text className="text-base font-medium text-white mb-3">
            Title <Text className="text-[#F45B69]">*</Text>
          </Text>
          <TextInput
            className={`bg-white rounded-lg px-4 py-3 text-base text-[#114B5F] ${
              errors.title
                ? "border-2 border-[#F45B69]"
                : "border border-[#7EE4EC]"
            }`}
            value={title}
            onChangeText={setTitle}
            placeholder="Note title"
          />
          {errors.title && (
            <Text className="text-[#F45B69] text-sm mt-1">{errors.title}</Text>
          )}
        </View>

        {/* Content */}
        <View className="mb-8">
          <Text className="text-base font-medium text-white mb-3">
            Content <Text className="text-[#F45B69]">*</Text>
          </Text>
          <TextInput
            className={`bg-white rounded-lg px-4 py-3 text-base min-h-48 text-[#114B5F] ${
              errors.content
                ? "border-2 border-[#F45B69]"
                : "border border-[#7EE4EC]"
            }`}
            value={content}
            onChangeText={setContent}
            placeholder="Write your note here..."
            multiline
            textAlignVertical="top"
          />
          {errors.content && (
            <Text className="text-[#F45B69] text-sm mt-1">
              {errors.content}
            </Text>
          )}
        </View>

        {/* Priority */}
        <View className="mb-8">
          <Text className="text-base font-medium text-white mb-4">
            Priority <Text className="text-[#F45B69]">*</Text>
          </Text>
          {errors.priority && (
            <Text className="text-[#F45B69] text-sm mb-3 text-center">
              {errors.priority}
            </Text>
          )}
          <View className="flex-row justify-center gap-4 mb-4">
            <TouchableOpacity
              className={`flex-row items-center px-4 py-2 rounded-lg ${
                priority === "top" ? "bg-[#F45B69]" : "bg-gray-200"
              } ${errors.priority ? "border-2 border-[#F45B69]" : ""}`}
              onPress={() => setPriority("top")}
            >
              <View
                className={`w-4 h-4 border-2 rounded mr-2 ${
                  priority === "top"
                    ? "bg-[#F45B69] border-[#F45B69]"
                    : "border-gray-400"
                }`}
              />
              <Text className="text-sm font-medium text-[#114B5F]">
                Important
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-row items-center px-4 py-2 rounded-lg ${
                priority === "moderate" ? "bg-[#456990]" : "bg-gray-200"
              } ${errors.priority ? "border-2 border-[#F45B69]" : ""}`}
              onPress={() => setPriority("moderate")}
            >
              <View
                className={`w-4 h-4 border-2 rounded mr-2 ${
                  priority === "moderate"
                    ? "bg-[#456990] border-[#456990]"
                    : "border-gray-400"
                }`}
              />
              <Text className="text-sm font-medium text-[#114B5F]">Normal</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center">
            <TouchableOpacity
              className={`flex-row items-center px-4 py-2 rounded-lg ${
                priority === "wait" ? "bg-[#115f30]" : "bg-gray-200"
              } ${errors.priority ? "border-2 border-[#F45B69]" : ""}`}
              onPress={() => setPriority("wait")}
            >
              <View
                className={`w-4 h-4 border-2 rounded mr-2 ${
                  priority === "wait"
                    ? "bg-[#115f30] border-[#115f30]"
                    : "border-gray-400"
                }`}
              />
              <Text className="text-sm font-medium text-[#114B5F]">Later</Text>
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

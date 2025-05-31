import { View, Text } from "react-native";

export default function EmptyState() {
  return (
    <View className="flex-1 justify-center items-center px-4">
      <View className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 max-w-sm w-full">
        <View className="items-center mb-6">
          <View className="w-16 h-16 rounded-2xl bg-blue-50 items-center justify-center mb-4">
            <Text className="text-3xl">📝</Text>
          </View>
          <Text className="text-xl font-bold text-gray-800 mb-2 text-center">
            No Notes Yet
          </Text>
          <Text className="text-sm text-gray-500 text-center leading-5">
            Create your first note to get organized and stay on track
          </Text>
        </View>
      </View>
    </View>
  );
}

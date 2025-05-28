import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import "../global.css";

const Dashboard = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-midnightBlue p-4">
      <Text className="text-white text-2xl font-bold mb-4">My Notes</Text>

      {/* Placeholder empty state */}
      <Text className="text-white text-base">You have no notes yet.</Text>

      {/* ADD button */}
      <Pressable
        onPress={() => router.push("/Form")}
        className="bg-coralPink mt-auto py-3 rounded-xl items-center"
      >
        <Text className="text-white font-semibold text-lg">ADD</Text>
      </Pressable>
    </View>
  );
};

export default Dashboard;

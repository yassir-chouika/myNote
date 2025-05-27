import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

const NoteDetails = () => {
  const { id } = useLocalSearchParams();

  return (
    <View className="flex-1 bg-[#114B5F] p-4">
      <Text className="text-white text-xl font-bold">Note ID: {id}</Text>
    </View>
  );
};

export default NoteDetails;

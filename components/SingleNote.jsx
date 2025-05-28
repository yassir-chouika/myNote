import { View, Text, TouchableOpacity } from "react-native";

const SingleNote = ({ title, content, time, priority, onModify, onDelete }) => {
  const getPriorityColor = () => {
    switch (priority) {
      case "top":
        return "bg-[#F45B69]";
      case "moderate":
        return "bg-[#456990]";
      case "wait":
        return "bg-[#FFD4CA]";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <View className="bg-[#F9FAFB] flex-1 px-4 py-8">
      <View className="bg-white rounded-2xl shadow-xl p-6">
        {/* Title and Priority Badge */}
        <View className="flex-row justify-between items-center mb-6">
          <Text
            className="text-2xl font-semibold text-[#114B5F] max-w-[70%]"
            numberOfLines={1}
          >
            {title}
          </Text>
          <View className={`${getPriorityColor()} rounded-full px-4 py-1`}>
            <Text className="text-white text-xs font-medium capitalize">
              {priority === "wait" ? "It can wait" : priority}
            </Text>
          </View>
        </View>

        {/* Full Content */}
        <Text className="text-lg text-gray-800 font-light leading-7 mb-6">
          {content}
        </Text>

        {/* Action Buttons */}
        <View className="flex-row justify-center gap-4 mt-4">
          <TouchableOpacity
            onPress={onModify}
            className="bg-[#7EE4EC] rounded-lg px-8 py-3"
          >
            <Text className="text-[#114B5F] text-sm font-semibold">Modify</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onDelete}
            className="bg-[#F45B69] rounded-lg px-8 py-3"
          >
            <Text className="text-white text-sm font-semibold">Delete</Text>
          </TouchableOpacity>
        </View>

        {/* Time */}
        <View className="items-center mt-6">
          <Text className="text-sm font-light text-[#456990]">{time}</Text>
        </View>
      </View>
    </View>
  );
};

export default SingleNote;

import { View, Text } from "react-native";

const NoteCard = ({ title, content, time, priority }) => {
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
    <View className="py-4 px-3">
      <View className="bg-white rounded-2xl shadow-lg p-5 justify-between">
        {/* Title and Priority Badge */}
        <View className="flex-row justify-between items-center mb-5">
          <Text
            className="text-xl font-semibold text-[#114B5F] max-w-[70%]"
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

        {/* Truncated Content */}
        <Text
          className="text-base text-gray-700 font-light leading-6 mb-5"
          numberOfLines={3}
        >
          {content}
        </Text>

        {/* Time */}
        <View className="items-end">
          <Text className="text-sm font-light text-[#7EE4EC]">{time}</Text>
        </View>
      </View>
    </View>
  );
};

export default NoteCard;

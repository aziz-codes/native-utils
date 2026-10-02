import { Text, View } from "react-native";
import { Post } from "../types";

const PostCard = ({ post }: { post: Post }) => {
  return (
    <View className="shadow-xs border">
      <Text className="font-semibold text-sm">{post.title}</Text>
      <Text className="text-xs">{post.body}</Text>
    </View>
  );
};

export default PostCard;

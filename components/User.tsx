import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { User as UserType } from "../types";

const User = ({ user }: { user: UserType }) => {
  const router = useRouter();
  return (
    <Pressable
      className="shadow-xs rounded-lg flex items-center gap-4 h-auto p-3 border"
      onPress={() => router.push(`/user/${user.id}`)}
    >
      <Text className="font-semibold tracking-tighter">{user.name}</Text>
      <View className="h-16 w-16 rounded-full overflow-hidden">
        <Image source={{ uri: user.avatar }} className="h-full w-full" />
      </View>
      <Text className="italic text-xs">{user.email}</Text>
      <View className="flex flex-row items-center gap-1">
        <View
          className={`h-2 w-2    rounded-full ${user.isOnline ? "bg-green-500 animate-pulse" : "bg-gray-600"}`}
        ></View>
        <Text className="text-xs">{user.isOnline ? "Online" : "Offline"}</Text>
      </View>
    </Pressable>
  );
};

export default User;

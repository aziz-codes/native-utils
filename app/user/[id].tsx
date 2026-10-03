import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, View } from "react-native";
import User from "../../components/User";
import { users } from "../../constants/users";

const UserDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const user = users.find((user) => user.id === id);
  if (!user) return <View>No user found, please check</View>;
  return (
    <View>
      <Button title="go back" onPress={() => router.back()} />
      <User user={user} />
    </View>
  );
};

export default UserDetails;

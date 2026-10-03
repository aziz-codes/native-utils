import { FlatList, View } from "react-native";
import User from "../components/User";
import { users } from "../constants/users";

const Home = () => {
  return (
    <View className="flex-1">
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <User user={item} />}
        ItemSeparatorComponent={() => <View className="h-1" />}
      />
    </View>
  );
};

export default Home;

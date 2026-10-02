import { useEffect, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import User from "../components/User";
import { users } from "../constants/users";

export default function Index() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [loading]);

  const filteredData = users.filter((user) => {
    const lower = search.toLowerCase();
    const emailSearch = user.email.includes(lower);
    const nameSearch = user.name.includes(lower);

    return emailSearch || nameSearch;
  });

  if (loading) return <Text>Loading...</Text>;
  return (
    <View className="flex-1  gap-3 p-3">
      <TextInput
        placeholder="search"
        className="w-full rounded-md p-2 border border-gray-200"
        onChangeText={setSearch}
      />
      {!filteredData.length ? (
        <Text>No Users Found..</Text>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <User user={item} />}
          ItemSeparatorComponent={() => <View className="h-3" />}
          refreshing={refreshing}
          onRefresh={() => setLoading(true)}
        />
      )}
    </View>
  );
}

import { useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, Text, View } from "react-native";
import PostCard from "../components/post-card";
import { Post } from "../types";

const LIMIT = 10;

export default function Index() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async (pageNumber: number, isLoadMore = false) => {
    try {
      setError(null);

      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=${LIMIT}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data: Post[] = await response.json();

      if (isLoadMore) {
        setPosts((prev) => [...prev, ...data]);
      } else {
        setPosts(data);
      }

      setHasMore(data.length === LIMIT);
      setPage(pageNumber);
    } catch (error) {
      setError("Something went wrong, please try again.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts(1);
  }, []);

  const handleLoadMore = () => {
    if (loadingMore || loading || !hasMore) {
      return;
    }

    fetchPosts(page + 1, true);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setHasMore(true);
    fetchPosts(1);
  };

  if (loading && posts.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error && posts.length === 0) {
    return (
      <View className="flex-1 items-center justify-center gap-3">
        <Text>{error}</Text>
        <Button title="Retry" onPress={() => fetchPosts(1)} />
      </View>
    );
  }

  return (
    <View className="flex-1 p-3">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostCard post={item} />}
        ItemSeparatorComponent={() => <View className="h-2" />}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <View className="py-4">
              <ActivityIndicator />
            </View>
          ) : null
        }
      />

      {error && posts.length > 0 && (
        <Text className="p-2 text-center">{error}</Text>
      )}
    </View>
  );
}

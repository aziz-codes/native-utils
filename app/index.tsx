import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
type Error = Record<string, string>;
const Home = () => {
  const [errors, setErrors] = useState<Error>({});
  const [loading, setloading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (name: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handlePress = async () => {
    const { email, name, password } = form;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || name.length < 3) {
      setErrors({ name: "Name is required, max length 3 chars" });
      return;
    }
    if (!emailRegex.test(email)) {
      setErrors({ email: "please enter a valid email address" });
      return;
    }
    if (!password || password.length < 8) {
      setErrors({ password: "password atelast should be 8 chars" });
      return;
    }

    setloading(true);
  };
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (loading) {
      timer = setTimeout(() => {
        setloading(false);
        alert("form submitted");
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [loading]);
  return (
    <View className="p-4">
      <KeyboardAvoidingView>
        <TextInput
          placeholder="name"
          className={`p-2 ${errors?.name && "border border-red-500"} `}
          onChangeText={(value) => handleChange("name", value)}
        />
        {errors["name"] && (
          <Text className="text-xs text-red-500">{errors["name"]}</Text>
        )}
        <TextInput
          placeholder="email"
          className={`p-2 ${errors?.email && "border border-red-500"} `}
          onChangeText={(value) => handleChange("email", value)}
          keyboardType="email-address"
        />
        {errors["email"] && (
          <Text className="text-xs text-red-500">{errors["email"]}</Text>
        )}
        <TextInput
          placeholder="password"
          className={`p-2 ${errors?.password && "border border-red-500"} `}
          onChangeText={(value) => handleChange("password", value)}
          secureTextEntry
        />
        {errors["password"] && (
          <Text className="text-xs text-red-500">{errors["password"]}</Text>
        )}
        <Pressable
          className="flex justify-center py-3 rounded-md bg-blue-600 disabled:bg-gray-500"
          onPress={handlePress}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text className="text-white text-center">Submit Data</Text>
          )}
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Home;
